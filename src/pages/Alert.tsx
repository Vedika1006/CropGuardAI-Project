import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Label } from '@/components/ui';
import { PageHeader } from '@/components/PageHeader';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { sendSMSAlert } from '@/lib/api';
import { colors } from '@/theme/colors';

export const Alert: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { language } = useSettingsStore();
  const [phoneNumber, setPhoneNumber] = useState('+91 9876543210');
  const [loading, setLoading] = useState(false);

  const result = (route.params as any)?.result;

  const message = result
    ? `CropGuard AI Alert: ${result.disease} detected in ${result.crop} with ${result.confidence}% confidence. Immediate action recommended.`
    : '';

  const handleSendAlert = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }

    setLoading(true);
    try {
      await sendSMSAlert(phoneNumber, message);
      alert('Alert sent successfully!');
      setTimeout(() => navigation.navigate('Home' as never), 1500);
    } catch (error) {
      alert('Failed to send alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={t('smsAlert', language)}
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
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Label>Expert Phone Number</Label>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="call"
                size={20}
                color={colors.mutedForeground}
                style={styles.icon}
              />
              <Input
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="+91 9876543210"
                keyboardType="phone-pad"
                style={styles.inputWithIcon}
              />
            </View>
            <Text style={styles.hint}>
              Default: Agricultural expert helpline
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Label>Message</Label>
            <TextInput
              value={message}
              editable={false}
              multiline
              numberOfLines={6}
              style={styles.textArea}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          <Button
            onPress={handleSendAlert}
            style={styles.button}
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Sending...' : t('sendAlert', language)}
          </Button>

          <Text style={styles.footerText}>
            This will send an SMS alert to the expert with crop disease information
          </Text>
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
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 40,
  },
  hint: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 8,
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
  button: {
    marginTop: 8,
    minHeight: 48,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.mutedForeground,
    marginTop: 16,
  },
});
