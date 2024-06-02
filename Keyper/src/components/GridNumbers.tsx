import React from 'react';
import { FlatList,StyleSheet, Text, View } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import { LockStatus, LockType, Screen } from '../enums/Index';
import { Lock } from '../types/Lock';
import {
  colors,
  handleEraseLocker,
  screenHeight,
  screenWidth,
  storeLockData,
} from '../utils/index';

import { CustomBottomSheet } from './CustomBottomSheet';

const digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];

export const GridNumbers = ({ route, navigation }: any) => {
  const { passwordLength } = route?.params ?? 4;
  const { lockNumber } = route?.params ?? 1;

  const [password, setPassword] = React.useState<number[]>([]);
  const [openBottomSheet, setOpenBottomSheet] = React.useState<boolean>(false);

  const handlePress = (digit: number) => {
    if (password.length < passwordLength) {
      setPassword([...password, digit]);
    }
  };

  const removeLastDigit = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, password.length - 1));
    }
  };

  const cleanAllDigits = () => {
    setPassword([]);
  };

  const arrayToNumber = () => {
    return password.toString().replace(/,/g, '');
  };

  const handleFinish = async () => {
    const lock: Lock = {
      lockNumber,
      lockLenght: passwordLength,
      lockType: LockType.electronicCombinationLock,
      lockCode: arrayToNumber(),
      lockStatus: LockStatus.locked,
    };
    await storeLockData(lock);
    cleanAllDigits();
    navigation.navigate(Screen.passcode);
  };

  const renderBtns = (number: number) => {
    if (number >= 0) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.1}
          backgroundColor={
            password.length < passwordLength ? colors.customGrey : colors.grey
          }
          backgroundShadow={colors.customGreyContour}
          backgroundActive={colors.customGreyActive}
          backgroundDarker={colors.customGreyContour}
          disabled={password.length === passwordLength}
          onPressOut={() => {
            handlePress(number);
          }}
        >
          <Text style={GridNumbersStyles.numberAndPasswordTxt}>{number}</Text>
        </AwesomeButton>
      );
    } else if (number === -1) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.1}
          backgroundColor={
            password.length === 0 ? colors.customRed : colors.red
          }
          backgroundShadow={colors.customRedContour}
          backgroundActive={colors.customRedActive}
          backgroundDarker={colors.customRedContour}
          disabled={password.length === 0}
          onPressOut={() => {
            removeLastDigit();
          }}
        >
          <Text style={GridNumbersStyles.numberAndPasswordTxt}>{'C'}</Text>
        </AwesomeButton>
      );
    } else if (number === -2) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.1}
          backgroundColor={
            password.length < passwordLength ? colors.customGreen : colors.green
          }
          backgroundShadow={colors.customGrenContour}
          backgroundActive={colors.customGrenActive}
          backgroundDarker={colors.customGrenContour}
          disabled={password.length < passwordLength}
          onPressOut={async () => await handleFinish()}
        >
          <Text style={GridNumbersStyles.numberAndPasswordTxt}>{'✓'}</Text>
        </AwesomeButton>
      );
    }
    return <></>;
  };

  return (
    <View style={GridNumbersStyles.container}>
      <View
        style={GridNumbersStyles.containerView}
        onTouchStart={() => {
          setOpenBottomSheet(false);
        }}
      >
        <View style={GridNumbersStyles.passwordView}>
          <Text style={GridNumbersStyles.numberAndPasswordTxt}>{password}</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={digits}
          horizontal={false}
          columnWrapperStyle={{
            margin: '1.4%',
            gap: 12,
          }}
          contentContainerStyle={
            GridNumbersStyles.flatlistContentContainerStyle
          }
          renderItem={({ item }) => renderBtns(item)}
          numColumns={3}
        />
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.1}
          backgroundColor={colors.gearGrey}
          backgroundShadow={colors.gearGreyContour}
          backgroundActive={colors.gearGreyActive}
          backgroundDarker={colors.gearGreyContour}
          onPress={() => setOpenBottomSheet(true)}
        >
          <Text style={{ fontSize: 30, color: colors.plumPurple }}>{'⚙︎'}</Text>
        </AwesomeButton>
      </View>
      <CustomBottomSheet
        openBottomSheet={openBottomSheet}
        setOpenBottomSheet={setOpenBottomSheet}
        handleEraseLocker={() =>
          handleEraseLocker(navigation, setOpenBottomSheet)
        }
      />
    </View>
  );
};

const GridNumbersStyles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.floralWhite,
  },
  containerView: {
    height: screenHeight * 0.82,
    width: screenWidth * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordView: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.8,
    borderRadius: 8,
    borderColor: 'grey',
  },
  numberAndPasswordTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.plumPurple,
  },
  flatlistContentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
