import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Label } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { colors } from '@/theme/colors';

type FormType = 'none' | 'issue' | 'expert';

export const Help: React.FC = () => {
  const { language } = useSettingsStore();
  const [activeForm, setActiveForm] = useState<FormType>('none');
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(
      activeForm === 'issue'
        ? 'Issue reported successfully!'
        : 'Expert help request sent!'
    );

    setFormData({ title: '', description: '' });
    setActiveForm('none');
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('help', language)}
        subtitle="How can we help you today?"
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeForm === 'none' ? (
          <>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => setActiveForm('issue')}
            >
              <View style={styles.helpButtonContent}>
                <View style={[styles.iconContainer, styles.iconContainerPrimary]}>
                  <Ionicons name="alert-circle" size={24} color={colors.primary} />
                </View>
                <View style={styles.helpButtonText}>
                  <Text style={styles.helpButtonTitle}>{t('reportIssue', language)}</Text>
                  <Text style={styles.helpButtonSubtitle}>
                    Report technical issues or bugs
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => setActiveForm('expert')}
            >
              <View style={styles.helpButtonContent}>
                <View style={[styles.iconContainer, styles.iconContainerAccent]}>
                  <Ionicons name="people" size={24} color={colors.accentForeground} />
                </View>
                <View style={styles.helpButtonText}>
                  <Text style={styles.helpButtonTitle}>{t('requestExpertHelp', language)}</Text>
                  <Text style={styles.helpButtonSubtitle}>
                    Get help from agricultural experts
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Quick Tips</Text>
              <View style={styles.tipsList}>
                <View style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>Take clear, well-lit photos of affected leaves</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>Focus on visible symptoms and discoloration</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>Multiple angles help improve accuracy</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>Check history for past treatment recommendations</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.formTitle}>
              {activeForm === 'issue'
                ? t('reportIssue', language)
                : t('requestExpertHelp', language)}
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChangeText={(text) => setFormData({ ...formData, title: text })}
                  placeholder="Brief description"
                />
              </View>

              <View style={styles.inputContainer}>
                <Label>Description</Label>
                <TextInput
                  value={formData.description}
                  onChangeText={(text) => setFormData({ ...formData, description: text })}
                  placeholder="Provide detailed information"
                  multiline
                  numberOfLines={6}
                  style={styles.textArea}
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>

              <View style={styles.buttonRow}>
                <Button
                  variant="secondary"
                  onPress={() => setActiveForm('none')}
                  style={styles.button}
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleSubmit}
                  disabled={loading}
                  loading={loading}
                  style={styles.button}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </View>
            </View>
          </View>
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
  helpButton: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    minHeight: 80,
    justifyContent: 'center',
  },
  helpButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerPrimary: {
    backgroundColor: colors.primary + '1A',
  },
  iconContainerAccent: {
    backgroundColor: colors.accent + '1A',
  },
  helpButtonText: {
    flex: 1,
  },
  helpButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: 4,
  },
  helpButtonSubtitle: {
    fontSize: 12,
    color: colors.mutedForeground,
  },
  tipsCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.foreground,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  tipBullet: {
    fontSize: 14,
    color: colors.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.foreground,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.foreground,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
  },
});
