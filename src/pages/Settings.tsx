import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore, Language } from '@/store/settingsStore';
import { useAuthStore } from '@/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/theme/colors';

export const Settings: React.FC = () => {
  const navigation = useNavigation();
  const { language, voiceAssistance, setLanguage, toggleVoiceAssistance } = useSettingsStore();
  const { logout, user } = useAuthStore();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
  ];

  const handleLogout = () => {
    logout();
    alert('Logged out successfully');
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('settings', language)}
        subtitle={user?.name}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="globe" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>{t('language', language)}</Text>
            </View>

            <View style={styles.languageList}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => setLanguage(lang.code)}
                  style={[
                    styles.languageButton,
                    language === lang.code && styles.languageButtonActive,
                  ]}
                >
                  <Text style={[
                    styles.languageText,
                    language === lang.code && styles.languageTextActive,
                  ]}>
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.switchContainer}>
              <View style={styles.switchLabelContainer}>
                <Ionicons name="volume-high" size={20} color={colors.primary} />
                <View style={styles.switchTextContainer}>
                  <Text style={styles.switchTitle}>{t('voiceAssistance', language)}</Text>
                  <Text style={styles.switchSubtitle}>
                    Enable voice output for results
                  </Text>
                </View>
              </View>
              <Switch
                value={voiceAssistance}
                onValueChange={toggleVoiceAssistance}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.aboutButton}
            onPress={() => navigation.navigate('About' as never)}
          >
            <Ionicons name="information-circle" size={20} color={colors.primary} />
            <View style={styles.aboutTextContainer}>
              <Text style={styles.aboutTitle}>{t('about', language)}</Text>
              <Text style={styles.aboutSubtitle}>
                Version 1.0.0 • Learn more about CropGuard AI
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Button
          onPress={handleLogout}
          variant="destructive"
          style={styles.logoutButton}
        >
          <Ionicons name="log-out" size={20} color={colors.destructiveForeground} />
          <Text style={styles.logoutText}>Logout</Text>
        </Button>
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  languageList: {
    gap: 8,
  },
  languageButton: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  languageButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '0D',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.foreground,
  },
  languageTextActive: {
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  switchTextContainer: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: 4,
  },
  switchSubtitle: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
  },
  aboutTextContainer: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: 4,
  },
  aboutSubtitle: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 48,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.destructiveForeground,
  },
});
