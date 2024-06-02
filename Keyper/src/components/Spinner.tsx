import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, screenHeight, screenWidth } from '@/utils/index';

export const Spinner = () => {
  return (
    <View style={SpinnerStyles.container}>
      <ActivityIndicator size="large" color={colors.deepCerise} />
    </View>
  );
};

const SpinnerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.floralWhite,
  },
});
