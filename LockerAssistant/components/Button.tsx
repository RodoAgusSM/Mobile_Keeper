import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../utils/index';

type BtnProps = {
  text: string;
  event: any;
};

export const Button = (btnProps: BtnProps) => {
  return (
    <TouchableOpacity style={buttonStyles.btn} onPress={btnProps.event}>
      <Text>{btnProps.text}</Text>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  btn: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    margin: 10,
  },
});
