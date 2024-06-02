import React, {useState} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import AwesomeButton from 'react-native-really-awesome-button';
import Slider from '@react-native-community/slider';
import {
  colors,
  removeLockNumberData,
  screenHeight,
  screenWidth,
  storeLockNumberData,
} from '../utils/index';
import {Screen} from '../enums/Index';

export const Configuration = ({route, navigation}: any) => {
  const {t} = useTranslation();

  const {isChangingLockNumber} = route?.params ? route?.params : false;
  const {passwordLength: pLength} = route?.params ? route?.params : 3;

  const [lockNumber, setLockNumber] = React.useState<string>('');
  const [passwordLength, setPasswordLength] = useState<number>(
    isChangingLockNumber ? pLength : 3,
  );

  const onChangeLockNumber = (digit: string) => {
    setLockNumber(digit.replace(/[^0-9]/g, ''));
  };

  const onChangePasswordLength = (number: number) => {
    setPasswordLength(number);
  };

  const handleFlow = async () => {
    if (isChangingLockNumber) {
      await removeLockNumberData();
      await storeLockNumberData(lockNumber);
      navigation.navigate(Screen.passcode);
    } else {
      navigation.navigate(Screen.locker, {passwordLength, lockNumber});
    }
    setLockNumber('');
  };

  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.inputsView}>
        <View style={settingStyles.subInputsView}>
          <View style={settingStyles.InputsDividerView}>
            <Text style={settingStyles.headerTxt}>
              {t('Settings.lockNumber')}
            </Text>
            <TextInput
              style={settingStyles.textInput}
              keyboardType="numeric"
              onChangeText={onChangeLockNumber}
              value={lockNumber}
              placeholder={t('Settings.lockNumberPlaceholder') ?? ''}
              placeholderTextColor={colors.xanthous}
              returnKeyType="done"
            />
          </View>
          {!isChangingLockNumber && (
            <View style={settingStyles.InputsDividerView}>
              <Text style={settingStyles.headerTxt}>
                {t('Settings.passwordLength')}
              </Text>
              <Text style={settingStyles.numberLengthTxt}>
                {passwordLength && +passwordLength.toFixed(3)}
              </Text>
              <Slider
                style={{width: screenWidth * 0.7}}
                minimumTrackTintColor={colors.xanthous}
                thumbTintColor={colors.xanthous}
                value={passwordLength}
                onValueChange={onChangePasswordLength}
                step={1}
                lowerLimit={3}
                upperLimit={6}
                minimumValue={3}
                maximumValue={6}
              />
            </View>
          )}
        </View>
      </View>
      <View style={settingStyles.buttonView}>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.4}
          height={screenHeight * 0.08}
          style={{margin: '2%'}}
          backgroundColor={colors.sunset}
          backgroundShadow={colors.xanthous}
          backgroundActive={colors.peach}
          backgroundDarker={colors.xanthous}
          onPressOut={async () => await handleFlow()}>
          <Text style={settingStyles.labeltxt}>{t('Settings.continue')}</Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.floralWhite,
  },
  inputsView: {
    flex: 3,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subInputsView: {
    width: '90%',
    height: '75%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.peach,
  },
  InputsDividerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.plumPurple,
    textDecorationLine: 'underline',
    marginBottom: '2%',
  },
  textInput: {
    color: colors.plumPurple,
    borderBottomWidth: 2,
    borderColor: colors.xanthous,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  numberLengthTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.plumPurple,
    textDecorationLine: 'underline',
    textDecorationColor: colors.xanthous,
  },
  buttonView: {
    width: screenWidth,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labeltxt: {
    fontWeight: '700',
    color: colors.plumPurple,
  },
});
