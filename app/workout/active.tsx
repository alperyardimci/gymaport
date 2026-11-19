import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Vibration } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useWorkoutStore } from '@/store/workoutStore';
import { EXERCISES } from '@/data/exercises';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { activeProgram, completeWorkout } = useWorkoutStore();

  const [elapsed, setElapsed] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [restActive, setRestActive] = useState(false);
  const [currentDayIdx, setCurrentDayIdx] = useState(0);
  const [sets, setSets] = useState<Record<string, { reps: string; weight: string; done: boolean }[]>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentDay = activeProgram?.days?.[currentDayIdx];

  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  useEffect(() => {
    if (restActive && restTimer > 0) {
      restRef.current = setInterval(() => {
        setRestTimer((r) => {
          if (r <= 1) {
            clearInterval(restRef.current!);
            setRestActive(false);
            Vibration.vibrate([0, 300, 100, 300]);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (restRef.current) clearInterval(restRef.current); };
  }, [restActive]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getSetList = (exerciseId: string, defaultSets: number) => {
    if (!sets[exerciseId]) {
      setSets((prev) => ({
        ...prev,
        [exerciseId]: Array.from({ length: defaultSets }, () => ({ reps: '', weight: '', done: false })),
      }));
      return [];
    }
    return sets[exerciseId];
  };

  const updateSet = (exId: string, setIdx: number, field: 'reps' | 'weight', value: string) => {
    setSets((prev) => ({
      ...prev,
      [exId]: prev[exId].map((s, i) => i === setIdx ? { ...s, [field]: value } : s),
    }));
  };

  const completeSet = (exId: string, setIdx: number) => {
    setSets((prev) => ({
      ...prev,
      [exId]: prev[exId].map((s, i) => i === setIdx ? { ...s, done: true } : s),
    }));
    setRestTimer(90);
    setRestActive(true);
  };

  const handleFinish = () => {
    Alert.alert(t('workout.finish_title'), t('workout.finish_desc'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('workout.finish_confirm'),
        onPress: () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          completeWorkout({
            id: `session_${Date.now()}`,
            userId: '',
            name: currentDay?.name ?? 'Workout',
            startTime: new Date(Date.now() - elapsed * 1000).toISOString(),
            endTime: new Date().toISOString(),
            durationSeconds: elapsed,
            exercises: [],
            totalSets: 0,
            totalReps: 0,
            totalVolumeKg: 0,
            personalRecords: [],
            status: 'completed',
            createdAt: new Date().toISOString(),
          });
          router.back();
        },
      },
    ]);
  };

  if (!activeProgram || !currentDay) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <View style={styles.empty}>
          <Ionicons name="barbell-outline" size={48} color={Colors.text.tertiary} />
          <Text style={styles.emptyText}>{t('workout.no_active_program')}</Text>
          <Button title={t('common.back')} onPress={() => router.back()} variant="outline" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      {/* Header bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={handleFinish} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color={Colors.text.secondary} />
        </TouchableOpacity>
        <View style={styles.timerBox}>
          <Ionicons name="time-outline" size={14} color={Colors.accent.blue} />
          <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
        </View>
        <Button title={t('workout.finish')} onPress={handleFinish} size="sm" variant="outline" />
      </View>

      {/* Rest timer */}
      {restActive && (
        <View style={styles.restBanner}>
          <Ionicons name="timer-outline" size={16} color={Colors.accent.gold} />
          <Text style={styles.restText}>{t('workout.rest')} {formatTime(restTimer)}</Text>
          <TouchableOpacity onPress={() => { setRestActive(false); setRestTimer(0); }}>
            <Text style={styles.skipRestText}>{t('workout.skip_rest')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Day selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayTabs}>
        {activeProgram.days?.map((d, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.dayTab, currentDayIdx === idx && styles.dayTabActive]}
            onPress={() => setCurrentDayIdx(idx)}
          >
            <Text style={[styles.dayTabText, currentDayIdx === idx && styles.dayTabTextActive]}>
              {d.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.dayTitle}>{currentDay.name}</Text>

        {currentDay.exercises?.map((ex: any, exIdx: number) => {
          const exercise = EXERCISES.find((e) => e.id === ex.exerciseId);
          const setList = getSetList(ex.exerciseId, ex.sets?.length ?? 3);

          return (
            <Card key={exIdx} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>
                  {exercise?.name ?? ex.exerciseId?.replace(/_/g, ' ') ?? 'Exercise'}
                </Text>
                <Badge label={`${ex.sets?.length ?? 3}×${ex.sets?.[0]?.targetReps ?? 10}`} variant="default" small />
              </View>
              {exercise && (
                <Text style={styles.exerciseMuscle}>{exercise.primaryMuscle}</Text>
              )}

              {/* Sets */}
              <View style={styles.setsHeader}>
                <Text style={styles.setsHeaderText}>SET</Text>
                <Text style={styles.setsHeaderText}>WEIGHT (kg)</Text>
                <Text style={styles.setsHeaderText}>REPS</Text>
                <Text style={styles.setsHeaderText}>DONE</Text>
              </View>

              {setList.map((set, sIdx) => (
                <View key={sIdx} style={[styles.setRow, set.done && styles.setRowDone]}>
                  <Text style={styles.setNum}>{sIdx + 1}</Text>
                  <TextInput
                    style={styles.setInput}
                    value={set.weight}
                    onChangeText={(v) => updateSet(ex.exerciseId, sIdx, 'weight', v)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={Colors.text.tertiary}
                    editable={!set.done}
                  />
                  <TextInput
                    style={styles.setInput}
                    value={set.reps}
                    onChangeText={(v) => updateSet(ex.exerciseId, sIdx, 'reps', v)}
                    keyboardType="number-pad"
                    placeholder={ex.sets?.[sIdx]?.targetReps ?? '10'}
                    placeholderTextColor={Colors.text.tertiary}
                    editable={!set.done}
                  />
                  <TouchableOpacity
                    style={[styles.checkBtn, set.done && styles.checkBtnDone]}
                    onPress={() => !set.done && completeSet(ex.exerciseId, sIdx)}
                  >
                    <Ionicons
                      name={set.done ? 'checkmark-circle' : 'ellipse-outline'}
                      size={22}
                      color={set.done ? Colors.status.success : Colors.text.tertiary}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </Card>
          );
        })}

        <View style={{ height: Spacing[10] }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing[4], paddingTop: 56, paddingBottom: Spacing[2] },
  closeBtn: { padding: Spacing[2] },
  timerBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.accent.blueMuted, paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.full },
  timerText: { fontSize: Typography.size.sm, color: Colors.accent.blue, fontWeight: Typography.weight.bold, fontVariant: ['tabular-nums'] },
  restBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[2], backgroundColor: Colors.accent.gold + '22', paddingVertical: Spacing[2], borderBottomWidth: 1, borderBottomColor: Colors.accent.gold + '44' },
  restText: { fontSize: Typography.size.sm, color: Colors.accent.gold, fontWeight: Typography.weight.semibold },
  skipRestText: { fontSize: Typography.size.xs, color: Colors.text.tertiary, textDecorationLine: 'underline' },
  dayTabs: { paddingHorizontal: Spacing[4], gap: Spacing[2], paddingVertical: Spacing[2] },
  dayTab: { paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  dayTabActive: { backgroundColor: Colors.accent.blue, borderColor: Colors.accent.blue },
  dayTabText: { fontSize: Typography.size.xs, color: Colors.text.tertiary, fontWeight: Typography.weight.medium },
  dayTabTextActive: { color: '#fff' },
  content: { paddingHorizontal: Spacing[4], gap: Spacing[4] },
  dayTitle: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  exerciseCard: { gap: Spacing[2] },
  exerciseHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  exerciseName: { flex: 1, fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  exerciseMuscle: { fontSize: Typography.size.xs, color: Colors.text.tertiary, textTransform: 'capitalize' },
  setsHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  setsHeaderText: { flex: 1, fontSize: 9, fontWeight: Typography.weight.bold, color: Colors.text.tertiary, letterSpacing: 0.5, textAlign: 'center' },
  setRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], paddingVertical: Spacing[1] },
  setRowDone: { opacity: 0.6 },
  setNum: { width: 20, textAlign: 'center', fontSize: Typography.size.sm, color: Colors.text.tertiary },
  setInput: { flex: 1, textAlign: 'center', backgroundColor: Colors.bg.input, borderRadius: BorderRadius.sm, paddingVertical: Spacing[2], fontSize: Typography.size.sm, color: Colors.text.primary, borderWidth: 1, borderColor: Colors.border.subtle },
  checkBtn: { width: 36, alignItems: 'center' },
  checkBtnDone: {},
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing[4] },
  emptyText: { fontSize: Typography.size.base, color: Colors.text.secondary },
});
