import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import logo from '@/assets/logo.png';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, showLogo = false, action }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showLogo && (
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          )}
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {action && <View style={styles.action}>{action}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    height: 64,
    width: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primaryForeground,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.primaryForeground,
    opacity: 0.9,
  },
  action: {
    marginLeft: 16,
  },
});
