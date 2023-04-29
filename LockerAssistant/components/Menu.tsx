import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, getData, screenHeight, screenWidth} from '../utils/index';
import AwesomeButton from 'react-native-really-awesome-button';
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
          {'Select the type of locker you are going to use'}
        </Text>
      </View>
      <View style={homeStyles.lowerViewContainer}>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.7}
          height={screenHeight * 0.08}
          style={{margin: '2%'}}
          backgroundColor={colors.lightSeaGreen}
          backgroundShadow={colors.moonstone}
          backgroundActive={colors.cerulean}
          backgroundDarker={colors.moonstone}
          onPressOut={() => {
            navigation.navigate('Locker');
          }}>
          <Text>{'LockPad'}</Text>
        </AwesomeButton>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.7}
          height={screenHeight * 0.08}
          style={{margin: '2%'}}
          backgroundColor={colors.celadon}
          backgroundShadow={colors.esmerald}
          backgroundActive={colors.sage}
          backgroundDarker={colors.esmerald}
          onPressOut={() => {
            navigation.navigate('Locker');
          }}>
          <Text>{'Electronic Combination Locks'}</Text>
        </AwesomeButton>
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
    backgroundColor: colors.floralWhite,
  },
  upperViewContainer: {
    width: '95%',
    height: '10%',
    marginBottom: '20%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.peach,
  },
  header: {
    fontSize: 15,
    fontWeight: '600',
  },
  lowerViewContainer: {
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
});
