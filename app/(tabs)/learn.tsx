import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ARTICLES, FITNESS_DICTIONARY } from '@/data/educationalContent';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const CATEGORIES = ['all', 'training_systems', 'anatomy', 'nutrition', 'recovery'] as const;

export default function LearnScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [category, setCategory] = useState<string>('all');
  const [showDictionary, setShowDictionary] = useState(false);

  const lang = i18n.language as 'en' | 'tr';

  const filtered = ARTICLES.filter(
    (a) => category === 'all' || a.category === category
  );

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('nav.learn')}</Text>
      </View>

      {/* Toggle */}
      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleBtn, !showDictionary && styles.toggleBtnActive]}
          onPress={() => setShowDictionary(false)}
        >
          <Text style={[styles.toggleText, !showDictionary && styles.toggleTextActive]}>
            {t('learn.articles')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, showDictionary && styles.toggleBtnActive]}
          onPress={() => setShowDictionary(true)}
        >
          <Text style={[styles.toggleText, showDictionary && styles.toggleTextActive]}>
            {t('learn.dictionary')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!showDictionary ? (
          <>
            {/* Category filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.filterChip, category === cat && styles.filterChipActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[styles.filterText, category === cat && styles.filterTextActive]}>
                    {cat === 'all' ? t('common.all') : cat.replace('_', ' ')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Featured article */}
            {filtered[0] && (
              <TouchableOpacity
                onPress={() => router.push(`/learn/${filtered[0].slug}`)}
                activeOpacity={0.8}
              >
                <Card style={styles.featuredCard} variant="accent">
                  <Badge label={t('learn.featured')} variant="gold" small />
                  <Text style={styles.featuredTitle}>
                    {lang === 'tr' && filtered[0].titleTr ? filtered[0].titleTr : filtered[0].title}
                  </Text>
                  <Text style={styles.featuredExcerpt} numberOfLines={2}>
                    {filtered[0].summary}
                  </Text>
                  <View style={styles.articleMeta}>
                    <Ionicons name="time-outline" size={12} color={Colors.text.tertiary} />
                    <Text style={styles.metaText}>{filtered[0].readTimeMinutes} min</Text>
                    <Badge label={filtered[0].difficulty} variant="default" small />
                  </View>
                </Card>
              </TouchableOpacity>
            )}

            {/* Article list */}
            {filtered.slice(1).map((article) => (
              <TouchableOpacity
                key={article.slug}
                onPress={() => router.push(`/learn/${article.slug}`)}
                activeOpacity={0.7}
              >
                <Card style={styles.articleCard}>
                  <View style={styles.articleContent}>
                    <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(article.category) }]} />
                    <View style={styles.articleText}>
                      <Text style={styles.articleTitle} numberOfLines={2}>
                        {lang === 'tr' && article.titleTr ? article.titleTr : article.title}
                      </Text>
                      <View style={styles.articleMeta}>
                        <Ionicons name="time-outline" size={12} color={Colors.text.tertiary} />
                        <Text style={styles.metaText}>{article.readTimeMinutes} min</Text>
                        <Badge label={article.difficulty} variant="default" small />
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <Text style={styles.dictDesc}>{t('learn.dictionary_desc')}</Text>
            {FITNESS_DICTIONARY.map((term) => (
              <Card key={term.term} style={styles.termCard}>
                <View style={styles.termHeader}>
                  <Text style={styles.termWord}>{term.term}</Text>
                  <Badge label={term.category} variant="default" small />
                </View>
                <Text style={styles.termDef}>
                  {lang === 'tr' ? term.definitionTr : term.definition}
                </Text>
                {term.example && (
                  <Text style={styles.termExample}>
                    {t('learn.example')}: {term.example}
                  </Text>
                )}
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    training: Colors.accent.blue,
    nutrition: '#22c55e',
    recovery: '#a855f7',
    mindset: Colors.accent.gold,
  };
  return map[category] ?? Colors.accent.blue;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: Spacing[5], paddingTop: 56, paddingBottom: Spacing[2] },
  title: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  toggle: { flexDirection: 'row', marginHorizontal: Spacing[5], marginBottom: Spacing[3], backgroundColor: Colors.bg.input, borderRadius: BorderRadius.md, padding: 3 },
  toggleBtn: { flex: 1, paddingVertical: Spacing[2], alignItems: 'center', borderRadius: BorderRadius.sm },
  toggleBtnActive: { backgroundColor: Colors.accent.blue },
  toggleText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, fontWeight: Typography.weight.medium },
  toggleTextActive: { color: '#fff' },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3] },
  filterRow: { gap: Spacing[2], paddingVertical: 2 },
  filterChip: { paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  filterChipActive: { backgroundColor: Colors.accent.blue, borderColor: Colors.accent.blue },
  filterText: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  filterTextActive: { color: '#fff' },
  featuredCard: { gap: Spacing[2] },
  featuredTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.text.primary, lineHeight: 24 },
  featuredExcerpt: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  articleMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  metaText: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  articleCard: { padding: 0 },
  articleContent: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] },
  categoryDot: { width: 8, height: 8, borderRadius: 4 },
  articleText: { flex: 1, gap: 4 },
  articleTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  dictDesc: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  termCard: { gap: Spacing[2] },
  termHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  termWord: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  termDef: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  termExample: { fontSize: Typography.size.xs, color: Colors.text.tertiary, fontStyle: 'italic', borderLeftWidth: 2, borderLeftColor: Colors.accent.blue, paddingLeft: Spacing[2] },
});
