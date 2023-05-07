import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import AwesomeButton from 'react-native-really-awesome-button';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {colors, screenHeight, screenWidth} from '../utils/index';

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

  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.inputsView}>
        <View style={settingStyles.subInputsView}>
          <View style={settingStyles.InputsDividerView}>
            <Text style={settingStyles.lockNumberTxt}>
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
              <Text style={settingStyles.passwordLengthTxt}>
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
          backgroundColor={
            lockNumber.trim() !== '' ? colors.sunset : colors.peach
          }
          backgroundShadow={colors.xanthous}
          backgroundActive={colors.peach}
          backgroundDarker={colors.xanthous}
          disabled={lockNumber.trim() === ''}
          onPressOut={() => {
            navigation.navigate('Locker', {passwordLength, lockNumber});
          }}>
          <Text>{t('Settings.continue')}</Text>
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
  lockNumberTxt: {
    fontSize: 22,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginBottom: '2%',
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: colors.xanthous,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  passwordLengthTxt: {
    fontSize: 22,
    fontWeight: '800',
    textDecorationLine: 'underline',
    marginBottom: '2%',
  },
  numberLengthTxt: {
    fontSize: 20,
    fontWeight: '600',
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
});
