import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { useHistoryStore } from '@/store/historyStore';
import { colors } from '@/theme/colors';
import { Image } from 'expo-image';

export const History: React.FC = () => {
  const { language } = useSettingsStore();
  const { detections, clearHistory } = useHistoryStore();

  const handleClearHistory = () => {
    clearHistory();
    alert('History cleared');
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('history', language)}
        subtitle={`${detections.length} detections`}
        action={
          detections.length > 0 && (
            <TouchableOpacity onPress={handleClearHistory}>
              <Ionicons name="trash" size={20} color={colors.primaryForeground} />
            </TouchableOpacity>
          )
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {detections.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar" size={64} color={colors.mutedForeground} />
            <Text style={styles.emptyTitle}>No History Yet</Text>
            <Text style={styles.emptyText}>
              Your crop disease detections will appear here
            </Text>
          </View>
        ) : (
          detections.map((detection) => (
            <View key={detection.id} style={styles.card}>
              <View style={styles.detectionHeader}>
                <Image
                  source={{ uri: detection.imageUrl }}
                  style={styles.detectionImage}
                  contentFit="cover"
                />

                <View style={styles.detectionInfo}>
                  <Text style={styles.cropName}>{detection.crop}</Text>
                  <Text style={styles.diseaseName}>{detection.disease}</Text>
                  <View style={styles.metaInfo}>
                    <Text style={styles.metaText}>{detection.confidence}% confidence</Text>
                    <Text style={styles.metaText}>•</Text>
                    <Text style={styles.metaText}>
                      {format(new Date(detection.date), 'MMM dd, yyyy')}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.treatmentsSection}>
                <Text style={styles.treatmentLabel}>{t('organic', language)}</Text>
                {detection.treatments.organic.slice(0, 2).map((treatment, idx) => (
                  <View key={idx} style={styles.treatmentItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: colors.foreground,
  },
  emptyText: {
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  detectionHeader: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detectionImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
  },
  detectionInfo: {
    flex: 1,
    gap: 4,
  },
  cropName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  diseaseName: {
    fontSize: 14,
    color: colors.destructive,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  treatmentsSection: {
    marginTop: 12,
  },
  treatmentLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  bullet: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 2,
  },
  treatmentText: {
    flex: 1,
    fontSize: 12,
    color: colors.mutedForeground,
  },
});
