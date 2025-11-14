import React from 'react';
import { TextInput, StyleSheet, View, ViewStyle, TextInputProps } from 'react-native';
import { colors } from '@/theme/colors';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({ containerStyle, style, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={colors.mutedForeground}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.foreground,
    minHeight: 48,
  },
});
