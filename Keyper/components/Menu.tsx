import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  colors,
  getLockData,
  getUserPreferencesData,
  handleLanguageChange,
  screenHeight,
  screenWidth,
} from '../utils/index';
import { Screen, Language } from '../enums/Index';
import { Lock } from '../types/Lock';
import { UserPreferences } from '../types/UserPreferences';
import { Popup } from './Popup';

export const Menu = ({ navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const userPreferences =
        (await getUserPreferencesData()) as UserPreferences;
      if (userPreferences) {
        i18n.changeLanguage(userPreferences.language);
      }
    };

    const fetchStorage = async () => {
      const data = (await getLockData()) as Lock;
      if (data) {
        navigation.navigate(Screen.passcode);
      }
    };
    fetchUserPreferences();
    fetchStorage();
  }, []);

  return (
    <View style={homeStyles.mainContainer}>
      <View style={homeStyles.upperViewContainer}>
        <View style={homeStyles.subUpperViewContainer}>
          <Text style={homeStyles.header}>{t('Menu.title')}</Text>
        </View>
      </View>
      <View style={homeStyles.lowerViewContainer}>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.7}
          height={screenHeight * 0.08}
          style={{ margin: '2%' }}
          backgroundColor={colors.celadon}
          backgroundShadow={colors.esmerald}
          backgroundActive={colors.sage}
          backgroundDarker={colors.esmerald}
          disabled={showPopup}
          onPressOut={() => {
            navigation.navigate(Screen.setting);
          }}
        >
          <Text style={homeStyles.labeltxt}>{t('Menu.start')}</Text>
        </AwesomeButton>
        {i18n.language === 'sp' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.7}
            height={screenHeight * 0.08}
            style={{ marginTop: '2%' }}
            backgroundColor={colors.lightRed}
            backgroundShadow={colors.bittersweet}
            backgroundActive={colors.melon}
            backgroundDarker={colors.bittersweet}
            disabled={showPopup}
            onPressOut={async () => {
              await handleLanguageChange(Language.english);
            }}
          >
            <Text style={homeStyles.labeltxt}>{t('Language.english')}</Text>
          </AwesomeButton>
        )}
        {i18n.language === 'en' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.7}
            height={screenHeight * 0.08}
            style={{ marginTop: '2%' }}
            backgroundColor={colors.lightRed}
            backgroundShadow={colors.bittersweet}
            backgroundActive={colors.melon}
            backgroundDarker={colors.bittersweet}
            disabled={showPopup}
            onPressOut={async () => {
              await handleLanguageChange(Language.spanish);
            }}
          >
            <Text style={homeStyles.labeltxt}>{t('Language.spanish')}</Text>
          </AwesomeButton>
        )}
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.08}
          style={{ marginTop: '4%' }}
          backgroundColor={colors.lightSeaGreen}
          backgroundShadow={colors.moonstone}
          backgroundActive={colors.cerulean}
          backgroundDarker={colors.moonstone}
          disabled={showPopup}
          onPressOut={() => {
            handlePopup();
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: colors.plumPurple,
            }}
          >
            {t('Menu.information')}
          </Text>
        </AwesomeButton>
      </View>
      {showPopup && <Popup event={handlePopup} />}
    </View>
  );
};

const homeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
    backgroundColor: colors.floralWhite,
  },
  upperViewContainer: {
    flex: 1,
    width: '90%',
    marginTop: '10%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  subUpperViewContainer: {
    width: '100%',
    height: '40%',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.peach,
  },
  header: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.plumPurple,
  },
  lowerViewContainer: {
    flex: 4,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labeltxt: {
    fontWeight: '700',
    color: colors.plumPurple,
  },
});
