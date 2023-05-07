import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  screenHeight,
  screenWidth,
  getData,
  removeLockNumberData,
  removePasswordData,
  deleteData,
  colors,
} from '../utils/index';
import {Lock} from '../types/Lock';
import {CustomBottomSheet} from './CustomBottomSheet';

export const Code = ({navigation}: any) => {
  const {t} = useTranslation();

  const [openBottomSheet, setOpenBottomSheet] = React.useState<boolean>(false);
  const [storage, setStorage] = React.useState<Lock>();

  useFocusEffect(
    useCallback(() => {
      fetchStorage();
      return () => {};
    }, []),
  );

  const fetchStorage = async () => {
    const data = (await getData()) as Lock;
    setStorage(data);
  };

  const handleChangeLocker = async () => {
    await removeLockNumberData();
    setOpenBottomSheet(false);
    navigation.navigate('Setting', {
      isChangingLockNumber: true,
      passwordLength: storage?.lockLenght,
    });
  };

  const handleChangePassword = async () => {
    await removePasswordData();
    setOpenBottomSheet(false);
    navigation.navigate('Locker', {
      passwordLength: storage?.lockLenght,
      lockNumber: storage?.lockNumber,
    });
  };

  const handleEraseLocker = async () => {
    await deleteData();
    setOpenBottomSheet(false);
    navigation.navigate('Home');
  };

  return (
    <View style={GridNumbersStyles.container}>
      <View
        style={GridNumbersStyles.upperContainer}
        onTouchStart={() => {
          setOpenBottomSheet(false);
        }}>
        <View style={GridNumbersStyles.dataContainer}>
          <View style={GridNumbersStyles.lockNumberView}>
            <Text style={GridNumbersStyles.lockNumberTitleTxt}>
              {t('Code.lockNumber')}
            </Text>
            <Text style={GridNumbersStyles.lockNumberTxt}>
              {storage?.lockNumber}
            </Text>
          </View>
          <View style={GridNumbersStyles.passcodeView}>
            <Text style={GridNumbersStyles.passcodeTitleTxt}>
              {t('Code.passcode')}
            </Text>
            <Text style={GridNumbersStyles.passcodeTxt}>
              {storage?.lockCode}
            </Text>
          </View>
        </View>
      </View>
      <View style={GridNumbersStyles.lowerContainer}>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.2}
          height={screenHeight * 0.08}
          backgroundColor={colors.gearGrey}
          backgroundShadow={colors.gearGreyContour}
          backgroundActive={colors.gearGreyActive}
          backgroundDarker={colors.gearGreyContour}
          onPress={() => setOpenBottomSheet(true)}>
          <Text style={{fontSize: 30}}>{'⚙︎'}</Text>
        </AwesomeButton>
      </View>
      <CustomBottomSheet
        openBottomSheet={openBottomSheet}
        setOpenBottomSheet={setOpenBottomSheet}
        handleChangeLocker={handleChangeLocker}
        handleChangePassword={handleChangePassword}
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
  upperContainer: {
    flex: 4,
    display: 'flex',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    width: '95%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '4%',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.peach,
  },
  lockNumberView: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockNumberTitleTxt: {fontSize: 22, fontWeight: '800'},
  lockNumberTxt: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.cerulean,
    textDecorationLine: 'underline',
  },
  passcodeView: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passcodeTitleTxt: {fontSize: 22, fontWeight: '800'},
  passcodeTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.cerulean,
    textDecorationLine: 'underline',
  },
  lowerContainer: {
    flex: 1,
    width: '95%',
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
