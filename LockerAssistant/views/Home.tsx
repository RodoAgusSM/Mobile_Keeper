import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../utils/index';

export const Home = () => {
  return (
    <View style={homeStyles.mainContainer}>
      <View style={homeStyles.viewContainer}>
        <Text style={homeStyles.textContainer}>
          Working on an app for iOS and Android
        </Text>
      </View>
      <View style={homeStyles.viewContainer}>
        <Text style={homeStyles.textContainer}>
          Trabajando en una app para iOS y Android
        </Text>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
    backgroundColor: '#10F212',
  },
  viewContainer: {
    width: '85%',
    height: '15%',
    backgroundColor: '#F0F01F',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 18,
    color: '#000',
    margin: 'auto',
    fontWeight: 'bold',
  },
});
