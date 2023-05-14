import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import i18n from '../translation';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  screenHeight,
  screenWidth,
  getLockData,
  handleEraseLocker,
  colors,
  getUserPreferencesData,
} from '../utils/index';
import {Lock} from '../types/Lock';
import {Screen} from '../enums/Index';
import {CustomBottomSheet} from './CustomBottomSheet';
import {UserPreferences} from '../types/UserPreferences';

export const Code = ({navigation}: any) => {
  const {t} = useTranslation();

  const [openBottomSheet, setOpenBottomSheet] = React.useState<boolean>(false);
  const [storage, setStorage] = React.useState<Lock>();

  useFocusEffect(
    useCallback(() => {
      fetchUserPreferences().then((data: any) => {
        const userPreferences = data as UserPreferences;
        if (userPreferences) {
          i18n.changeLanguage(userPreferences.language);
        }
      });
      fetchStorage();
      return () => {};
    }, []),
  );

  const fetchUserPreferences = async () => {
    const userPreferences = (await getUserPreferencesData()) as UserPreferences;
    if (userPreferences) {
      i18n.changeLanguage(userPreferences.language);
    }
  };

  const fetchStorage = async () => {
    const data = (await getLockData()) as Lock;
    setStorage(data);
  };

  const handleChangeLocker = async () => {
    setOpenBottomSheet(false);
    navigation.navigate(Screen.setting, {
      isChangingLockNumber: true,
      passwordLength: storage?.lockLenght,
    });
  };

  const handleChangePassword = async () => {
    setOpenBottomSheet(false);
    navigation.navigate(Screen.locker, {
      passwordLength: storage?.lockLenght,
      lockNumber: storage?.lockNumber,
    });
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
          width={screenWidth * 0.22}
          height={screenHeight * 0.1}
          backgroundColor={colors.gearGrey}
          backgroundShadow={colors.gearGreyContour}
          backgroundActive={colors.gearGreyActive}
          backgroundDarker={colors.gearGreyContour}
          onPress={() => setOpenBottomSheet(true)}>
          <Text style={{fontSize: 30, color: colors.plumPurple}}>{'⚙︎'}</Text>
        </AwesomeButton>
      </View>
      <CustomBottomSheet
        openBottomSheet={openBottomSheet}
        setOpenBottomSheet={setOpenBottomSheet}
        handleChangeLocker={handleChangeLocker}
        handleChangePassword={handleChangePassword}
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
  upperContainer: {
    flex: 4,
    display: 'flex',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    width: '95%',
    height: '70%',
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
  lockNumberTitleTxt: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.plumPurple,
  },
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
  passcodeTitleTxt: {fontSize: 22, fontWeight: '800', color: colors.plumPurple},
  passcodeTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.cerulean,
    textDecorationLine: 'underline',
  },
  lowerContainer: {
    flex: 1,
    width: '95%',
    marginBottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
