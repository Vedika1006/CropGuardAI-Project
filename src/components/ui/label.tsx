import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '@/theme/colors';

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Label: React.FC<LabelProps> = ({ children, style }) => {
  return <Text style={[styles.label, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.foreground,
    marginBottom: 8,
  },
});
