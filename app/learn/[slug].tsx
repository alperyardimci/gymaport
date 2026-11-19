import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import { ARTICLES } from '@/data/educationalContent';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ArticleScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'tr';

  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <Header title={t('learn.article_not_found')} showBack />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('learn.article_not_found')}</Text>
        </View>
      </LinearGradient>
    );
  }

  const title = lang === 'tr' && article.titleTr ? article.titleTr : article.title;
  const content = article.content;

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={title} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Meta */}
        <View style={styles.metaRow}>
          <Badge label={article.category} variant="accent" small />
          <Badge label={article.difficulty} variant="default" small />
          <Text style={styles.readTime}>{article.readTimeMinutes} min read</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Summary */}
        <Text style={styles.excerpt}>{article.summary}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <Text style={styles.body}>{content}</Text>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <View style={styles.keyPointsBox}>
            <Text style={styles.keyPointsTitle}>{t('learn.key_points')}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {article.tags.map((tag) => (
                <Text key={tag} style={styles.keyPointText}>#{tag}</Text>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[4] },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: Colors.text.secondary, fontSize: Typography.size.base },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], flexWrap: 'wrap', paddingTop: Spacing[2] },
  readTime: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  title: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary, lineHeight: 32 },
  excerpt: { fontSize: Typography.size.base, color: Colors.text.secondary, lineHeight: 24, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: Colors.border.subtle },
  body: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 24 },
  keyPointsBox: { backgroundColor: Colors.accent.blueMuted, borderRadius: BorderRadius.xl, padding: Spacing[4], gap: Spacing[2], borderWidth: 1, borderColor: Colors.accent.blue + '44' },
  keyPointsTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.accent.blue },
  keyPointRow: { flexDirection: 'row', gap: Spacing[2], alignItems: 'flex-start' },
  keyPointDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent.blue, marginTop: 6 },
  keyPointText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
});
