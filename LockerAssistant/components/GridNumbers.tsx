import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {
  screenHeight,
  screenWidth,
  storeData,
  getData,
  colors,
} from '../utils/index';
import AwesomeButton from 'react-native-really-awesome-button';
import {LockType, LockStatus} from '../enums/Index';
import {Lock} from '../types/Lock';
import BottomSheet from '@gorhom/bottom-sheet';

const digits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, -1, 9, -2];

export const GridNumbers = ({navigation}: any) => {
  const [password, setPassword] = React.useState<number[]>([]);
  const [updating, setUpdating] = React.useState<boolean>(false);
  const [openButtonSheet, setOpenButtonSheet] = React.useState<boolean>(false);
  const [b, setB] = React.useState<Lock>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['75%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    const fetchStorage = async () => {
      const data = (await getData()) as Lock;
      setB(data);
    };
    fetchStorage();
  }, []);

  useEffect(() => {
    if (updating) {
      setUpdating(false);
    }
  }, [password]);

  const handlePress = (digit: number) => {
    if (password.length < 4) {
      setUpdating(true);
      setPassword([...password, digit]);
    }
  };

  const removeLastDigit = () => {
    setUpdating(true);
    setPassword(password.slice(0, password.length - 1));
  };

  const arrayToNumber = () => {
    return password[0] !== 0
      ? Number(password.join(''))
      : password[0] + '' + Number(password.slice(1).join(''));
  };

  const handleFinish = async () => {
    const lock = {
      lockerNumber: 7,
      lockType: LockType.electronicCombinationLock,
      lockCode: arrayToNumber(),
      lockStatus: LockStatus.locked,
    } as Lock;
    await storeData(lock);
    navigation.navigate('Home');
  };

  const renderBtns = (number: number) => {
    if (number >= 0) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.21}
          height={screenHeight * 0.11}
          style={{margin: 3}}
          backgroundColor={colors.customGrey}
          backgroundShadow={colors.customGreyContour}
          backgroundActive={colors.customGreyActive}
          backgroundDarker={colors.customGreyContour}
          disabled={password.length === 4 || updating}
          onPress={() => {
            handlePress(number);
          }}>
          <Text>{number}</Text>
        </AwesomeButton>
      );
    } else if (number === -1) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.21}
          height={screenHeight * 0.11}
          style={{margin: 3}}
          backgroundColor={
            password.length === 0 ? colors.customRed : colors.red
          }
          backgroundShadow={colors.customRedContour}
          backgroundActive={colors.customRedActive}
          backgroundDarker={colors.customRedContour}
          disabled={password.length === 0 || updating}
          onPress={() => {
            removeLastDigit();
          }}>
          <Text>{'C'}</Text>
        </AwesomeButton>
      );
    } else if (number === -2) {
      return (
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.21}
          height={screenHeight * 0.11}
          style={{margin: 3}}
          backgroundColor={
            password.length < 4 ? colors.customGreen : colors.green
          }
          backgroundShadow={colors.customGrenContour}
          backgroundActive={colors.customGrenActive}
          backgroundDarker={colors.customGrenContour}
          disabled={password.length < 4 || updating}
          onPress={async () => await handleFinish()}>
          <Text>{'✓'}</Text>
        </AwesomeButton>
      );
    }
    return <></>;
  };

  return (
    <View style={GridNumbersStyles.container}>
      <View
        style={{
          height: screenHeight * 0.8,
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '40%',
            height: '5%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.8,
            borderRadius: 8,
            borderColor: 'grey',
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{password}</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={digits}
          horizontal={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
          renderItem={({item}) => renderBtns(item)}
          numColumns={3}
        />
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.21}
          height={screenHeight * 0.11}
          style={{margin: 3}}
          backgroundColor={colors.gearGrey}
          backgroundShadow={colors.gearGreyContour}
          backgroundActive={colors.gearGreyActive}
          backgroundDarker={colors.gearGreyContour}
          onPress={() => setOpenButtonSheet(true)}>
          <Text style={{fontSize: 30}}>{'⚙︎'}</Text>
        </AwesomeButton>
      </View>
      <BottomSheet
        onClose={() => setOpenButtonSheet(false)}
        ref={bottomSheetRef}
        index={openButtonSheet ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={{backgroundColor: 'transparent'}}
        backgroundStyle={{
          borderTopStartRadius: 18,
          borderTopEndRadius: 18,
        }}
        onChange={() => handleSheetChanges}>
        <Text
          style={{
            marginTop: '15%',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Options here 🎉
        </Text>
      </BottomSheet>
    </View>
  );
};

const GridNumbersStyles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.vanilla,
  },
});
