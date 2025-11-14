import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/authStore';
import { Button, Input, Label } from '@/components/ui';
import { t } from '@/lib/i18n';
import { useSettingsStore } from '@/store/settingsStore';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import logo from '@/assets/logo.png';
import { Image } from 'expo-image';

export const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const { signup } = useAuthStore();
  const { language } = useSettingsStore();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await signup(name, password);
      navigation.navigate('Home' as never);
    } catch (error) {
      alert('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} contentFit="contain" />
            <Text style={styles.title}>{t('appTitle', language)}</Text>
            <Text style={styles.subtitle}>Join us in protecting crops with AI</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('signup', language)}</Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Label>{t('name', language)}</Label>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person"
                    size={20}
                    color={colors.mutedForeground}
                    style={styles.icon}
                  />
                  <Input
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                    autoCapitalize="words"
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Label>{t('password', language)}</Label>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={colors.mutedForeground}
                    style={styles.icon}
                  />
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Label>Confirm Password</Label>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={colors.mutedForeground}
                    style={styles.icon}
                  />
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••"
                    secureTextEntry
                    style={styles.inputWithIcon}
                  />
                </View>
              </View>

              <Button
                onPress={handleSubmit}
                style={styles.button}
                disabled={loading}
                loading={loading}
              >
                {loading ? 'Creating account...' : t('signup', language)}
              </Button>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                <Text style={styles.footerLink}>{t('login', language)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.foreground,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
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
  button: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
