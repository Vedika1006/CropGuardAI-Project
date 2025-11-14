import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const NotFound: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 - Page Not Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    color: colors.foreground,
  },
});
