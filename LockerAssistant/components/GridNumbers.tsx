import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  screenHeight,
  screenWidth,
  storeData,
  deleteData,
  colors,
} from '../utils/index';
import {LockType, LockStatus} from '../enums/Index';
import {Lock} from '../types/Lock';
import {CustomBottomSheet} from './CustomBottomSheet';

const digits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1, 9, -2];

export const GridNumbers = ({route, navigation}: any) => {
  const {t, i18n} = useTranslation();

  const {passwordLength} = route?.params ?? 4;
  const {lockerNumber} = route?.params ?? 1;

  const [password, setPassword] = React.useState<number[]>([]);
  const [openBottomSheet, setOpenBottomSheet] = React.useState<boolean>(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    if (!openBottomSheet) {
      bottomSheetRef.current?.close();
    } else if (openBottomSheet) {
      bottomSheetRef.current?.expand();
    }
  }, [openBottomSheet]);

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
    return password[0] !== 0
      ? Number(password.join(''))
      : password[0] + '' + Number(password.slice(1).join(''));
  };

  const handleFinish = async () => {
    const lock = {
      lockerNumber: lockerNumber as number,
      lockLenght: passwordLength,
      lockType: LockType.electronicCombinationLock,
      lockCode: arrayToNumber(),
      lockStatus: LockStatus.locked,
    } as Lock;
    await storeData(lock);
    cleanAllDigits();
    navigation.navigate('Passcode');
  };

  const handleEraseLocker = async () => {
    await deleteData();
    setOpenBottomSheet(false);
    navigation.navigate('Home');
  };

  const renderBtns = (number: number) => {
    if (number >= 0) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.2}
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
          }}>
          <Text>{number}</Text>
        </AwesomeButton>
      );
    } else if (number === -1) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.2}
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
          }}>
          <Text>{'C'}</Text>
        </AwesomeButton>
      );
    } else if (number === -2) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.2}
          height={screenHeight * 0.1}
          backgroundColor={
            password.length < passwordLength ? colors.customGreen : colors.green
          }
          backgroundShadow={colors.customGrenContour}
          backgroundActive={colors.customGrenActive}
          backgroundDarker={colors.customGrenContour}
          disabled={password.length < passwordLength}
          onPressOut={async () => await handleFinish()}>
          <Text>{'✓'}</Text>
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
        }}>
        <View style={GridNumbersStyles.passwordView}>
          <Text style={GridNumbersStyles.passwordTxt}>{password}</Text>
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
          renderItem={({item}) => renderBtns(item)}
          numColumns={3}
        />
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.2}
          height={screenHeight * 0.1}
          backgroundColor={colors.gearGrey}
          backgroundShadow={colors.gearGreyContour}
          backgroundActive={colors.gearGreyActive}
          backgroundDarker={colors.gearGreyContour}
          onPress={() => setOpenBottomSheet(true)}>
          <Text style={{fontSize: 30}}>{'⚙︎'}</Text>
        </AwesomeButton>
      </View>
      <CustomBottomSheet
        navigation={navigation}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        openBottomSheet={openBottomSheet}
        setOpenBottomSheet={setOpenBottomSheet}
        handleSheetChanges={handleSheetChanges}
        handleEraseLocker={handleEraseLocker}
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
    height: screenHeight * 0.8,
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
  passwordTxt: {fontSize: 18, fontWeight: '600'},
  flatlistContentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
