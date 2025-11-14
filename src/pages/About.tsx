import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PageHeader } from '@/components/PageHeader';
import { useNavigation } from '@react-navigation/native';
import logo from '@/assets/logo.png';
import { colors } from '@/theme/colors';
import { Image } from 'expo-image';

export const About: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <PageHeader
        title="About"
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
        <View style={styles.logoCard}>
          <Image source={logo} style={styles.logo} contentFit="contain" />
          <Text style={styles.appName}>CropGuard AI</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            CropGuard AI empowers farmers with cutting-edge artificial intelligence to detect
            and prevent crop diseases. Our mission is to protect agricultural yields, reduce
            crop losses, and promote sustainable farming practices through technology.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.featureIconPrimary]}>
              <Ionicons name="shield" size={24} color={colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>95% Accuracy</Text>
              <Text style={styles.featureText}>
                Our AI model is trained on thousands of crop disease images for reliable detection
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.featureIconAccent]}>
              <Ionicons name="flash" size={24} color={colors.accentForeground} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Instant Results</Text>
              <Text style={styles.featureText}>
                Get disease detection and treatment recommendations in seconds
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, styles.featureIconDestructive]}>
              <Ionicons name="heart" size={24} color={colors.destructive} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Farmer-Friendly</Text>
              <Text style={styles.featureText}>
                Designed with farmers in mind, supporting multiple languages and offline access
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Support</Text>
          <Text style={styles.cardText}>
            Need help? Our agricultural experts are here to assist you.
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email: </Text>
              <Text style={styles.contactValue}>support@cropguard.ai</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone: </Text>
              <Text style={styles.contactValue}>+91 9876543210</Text>
            </View>
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
  },
  logoCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.foreground,
  },
  version: {
    fontSize: 14,
    color: colors.mutedForeground,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.foreground,
  },
  cardText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 22,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIconPrimary: {
    backgroundColor: colors.primary + '1A',
  },
  featureIconAccent: {
    backgroundColor: colors.accent + '1A',
  },
  featureIconDestructive: {
    backgroundColor: colors.destructive + '1A',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.foreground,
  },
  featureText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
  contactInfo: {
    marginTop: 16,
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
  },
  contactLabel: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
  },
});
