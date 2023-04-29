import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getData, screenHeight, screenWidth} from '../utils/index';
import {Button} from './Button';
import {Lock} from '../types/Lock';

export const Menu = ({navigation}: any) => {
  useEffect(() => {
    const fetchStorage = async () => {
      const data = (await getData()) as Lock;
      if (data) {
        navigation.navigate('Passcode');
      }
    };
    fetchStorage();
  }, []);

  return (
    <View style={homeStyles.mainContainer}>
      <View style={homeStyles.upperViewContainer}>
        <Text style={homeStyles.header}>
          Select the type of locker you are going to use
        </Text>
      </View>
      <View style={homeStyles.lowerViewContainer}>
        <Button text="LockPad" event={() => navigation.navigate('Locker')} />
        <Button
          text="Electronic Combination Locks"
          event={() => navigation.navigate('Locker')}
        />
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
  upperViewContainer: {
    width: '95%',
    height: '10%',
    backgroundColor: '#F0F01F',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerViewContainer: {
    width: '95%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0001FF',
    marginBottom: 10,
    borderRadius: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: '500',
  },
});
