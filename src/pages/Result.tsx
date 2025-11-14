import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Skeleton } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { useHistoryStore } from '@/store/historyStore';
import { predictDisease } from '@/lib/api';
import { colors } from '@/theme/colors';
import * as Speech from 'expo-speech';
import { Image } from 'expo-image';

export const Result: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { language, voiceAssistance } = useSettingsStore();
  const { addDetection } = useHistoryStore();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  const imageUri = (route.params as any)?.imageUri;

  useEffect(() => {
    if (!imageUri) {
      navigation.goBack();
      return;
    }

    const analyze = async () => {
      try {
        const prediction = await predictDisease(imageUri);
        setResult(prediction);

        addDetection({
          crop: prediction.crop,
          disease: prediction.disease,
          confidence: prediction.confidence,
          imageUrl: imageUri,
          treatments: prediction.treatments,
        });
      } catch (error) {
        alert('Analysis failed. Please try again.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [imageUri, addDetection, navigation]);

  const handleVoiceOutput = () => {
    if (!result) return;

    const text = `Detected ${result.disease} in ${result.crop} with ${result.confidence}% confidence.`;

    if (voiceAssistance) {
      Speech.speak(text, { language: language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'mr-IN' });
    } else {
      alert(text);
    }
  };

  const handleSMSAlert = () => {
    navigation.navigate('Alert' as never, { result } as never);
  };

  if (!imageUri) {
    return null;
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Detection Result"
        action={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.primaryForeground} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
        </View>

        {loading ? (
          <View style={styles.card}>
            <Skeleton height={32} width="75%" style={styles.skeleton} />
            <Skeleton height={24} width="50%" style={styles.skeleton} />
            <Skeleton height={48} width="100%" style={styles.skeleton} />
          </View>
        ) : result ? (
          <>
            <View style={styles.card}>
              <View style={styles.resultSection}>
                <Text style={styles.label}>{t('crop', language)}</Text>
                <Text style={styles.value}>{result.crop}</Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.label}>{t('disease', language)}</Text>
                <Text style={[styles.value, styles.diseaseValue]}>{result.disease}</Text>
              </View>

              <View style={styles.resultSection}>
                <Text style={styles.label}>{t('confidence', language)}</Text>
                <View style={styles.confidenceContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${result.confidence}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.confidenceValue}>{result.confidence}%</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={handleVoiceOutput}
                >
                  <Ionicons name="volume-high" size={20} color={colors.primary} />
                  <Text style={styles.secondaryButtonText}>{t('voiceOutput', language)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={handleSMSAlert}
                >
                  <Ionicons name="send" size={20} color={colors.primaryForeground} />
                  <Text style={styles.primaryButtonText}>{t('smsAlert', language)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.treatmentsTitle}>{t('treatments', language)}</Text>

              <View style={styles.treatmentsSection}>
                <Text style={[styles.treatmentType, styles.organicType]}>
                  {t('organic', language)}
                </Text>
                {result.treatments.organic.map((treatment: string, idx: number) => (
                  <View key={idx} style={styles.treatmentItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.treatmentsSection}>
                <Text style={[styles.treatmentType, styles.chemicalType]}>
                  {t('chemical', language)}
                </Text>
                {result.treatments.chemical.map((treatment: string, idx: number) => (
                  <View key={idx} style={styles.treatmentItem}>
                    <Text style={[styles.bullet, styles.bulletChemical]}>•</Text>
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.treatmentsSection}>
                <Text style={[styles.treatmentType, styles.preventiveType]}>
                  {t('preventive', language)}
                </Text>
                {result.treatments.preventive.map((treatment: string, idx: number) => (
                  <View key={idx} style={styles.treatmentItem}>
                    <Text style={[styles.bullet, styles.bulletPreventive]}>•</Text>
                    <Text style={styles.treatmentText}>{treatment}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : null}
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
  imageContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 256,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  skeleton: {
    marginBottom: 16,
  },
  resultSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.mutedForeground,
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  diseaseValue: {
    fontSize: 20,
    color: colors.destructive,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: colors.muted,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryForeground,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  treatmentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.foreground,
  },
  treatmentsSection: {
    marginBottom: 24,
  },
  treatmentType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  organicType: {
    color: colors.primary,
  },
  chemicalType: {
    color: colors.destructive,
  },
  preventiveType: {
    color: colors.accentForeground,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  bullet: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 2,
  },
  bulletChemical: {
    color: colors.destructive,
  },
  bulletPreventive: {
    color: colors.accentForeground,
  },
  treatmentText: {
    flex: 1,
    fontSize: 14,
    color: colors.foreground,
    lineHeight: 20,
  },
});
