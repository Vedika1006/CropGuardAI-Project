import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { ImageCarousel } from '@/components/ImageCarousel';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { colors } from '@/theme/colors';

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const { language } = useSettingsStore();
  const { user } = useAuthStore();

  const handleCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate('Result' as never, { imageUri: result.assets[0].uri } as never);
    }
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media library permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      navigation.navigate('Result' as never, { imageUri: result.assets[0].uri } as never);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('appTitle', language)}
        subtitle={`${t('welcome', language)}, ${user?.name || 'Farmer'}`}
        showLogo
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ImageCarousel />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detect Crop Disease</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryButton]}
              onPress={handleCapture}
            >
              <Ionicons name="camera" size={24} color={colors.primaryForeground} />
                  <Text style={styles.primaryButtonText}>{t('capturePhoto', language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={handleUpload}
                >
                  <Ionicons name="cloud-upload" size={24} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>{t('uploadFromGallery', language)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={[styles.statCard, styles.statCardAccent]}>
            <Text style={[styles.statValue, styles.statValueAccent]}>50+</Text>
            <Text style={styles.statLabel}>Diseases</Text>
          </View>
        </View>
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.foreground,
  },
  buttonContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 64,
    gap: 12,
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryForeground,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCardPrimary: {
    backgroundColor: colors.primary + '1A',
  },
  statCardAccent: {
    backgroundColor: colors.accent + '1A',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statValueAccent: {
    color: colors.accentForeground,
  },
  statLabel: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
});
