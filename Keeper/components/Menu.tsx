import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, DeviceEventEmitter} from 'react-native';
import {useTranslation} from 'react-i18next';
import QuickActions from 'react-native-quick-actions';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  colors,
  getLockData,
  getUserPreferencesData,
  handleLanguageChange,
  removeLocker,
  screenHeight,
  screenWidth,
} from '../utils/index';
import {Language} from '../enums/Index';
import {Lock} from '../types/Lock';
import {UserPreferences} from '../types/UserPreferences';
import {Popup} from './Popup';
import {Spinner} from './Spinner';

const NEW_LOCKER_SHORTCUT = 'CreateLocker';

export const Menu = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [quickActionNewLockerPressed, setQuickActionNewLockerPressed] =
    useState<boolean | null>(null);

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

    const procesShourtcut = (item: any) => {
      console.log('procesShourtcut ', item);
      if (item.type === NEW_LOCKER_SHORTCUT) {
        removeLocker();
        setQuickActionNewLockerPressed(true);
      }
    };

    QuickActions.popInitialAction()
      .then((item: any) => {
        setQuickActionNewLockerPressed(null);
        procesShourtcut(item);
      })
      .catch((err: any) => {
        setQuickActionNewLockerPressed(false);
      });

    DeviceEventEmitter.addListener('quickActionShortcut', (item: any) => {
      procesShourtcut(item);
    });

    const fetchStorage = async () => {
      const data = (await getLockData()) as Lock;
      if (data) {
        navigation.navigate('Passcode');
      }
    };
    fetchUserPreferences();
    fetchStorage();
  }, []);

  useEffect(() => {
    QuickActions.setShortcutItems([
      {
        title: t('ForceTouch.newLocker'),
        type: NEW_LOCKER_SHORTCUT,
        icon: 'Add',
        userInfo: {
          url: 'url',
        },
      },
    ]);
  }, [i18n.language]);

  useEffect(() => {
    if (quickActionNewLockerPressed) {
      navigation.navigate('Setting');
    }
  }, [quickActionNewLockerPressed]);

  return (
    <>
      {!quickActionNewLockerPressed ? (
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
              style={{margin: '2%'}}
              backgroundColor={colors.celadon}
              backgroundShadow={colors.esmerald}
              backgroundActive={colors.sage}
              backgroundDarker={colors.esmerald}
              disabled={showPopup}
              onPressOut={() => {
                navigation.navigate('Setting');
              }}>
              <Text>{t('Menu.start')}</Text>
            </AwesomeButton>
            {i18n.language === 'sp' && (
              <AwesomeButton
                progress={false}
                width={screenWidth * 0.7}
                height={screenHeight * 0.08}
                style={{marginTop: '2%'}}
                backgroundColor={colors.lightRed}
                backgroundShadow={colors.bittersweet}
                backgroundActive={colors.melon}
                backgroundDarker={colors.bittersweet}
                disabled={showPopup}
                onPressOut={async () => {
                  await handleLanguageChange(Language.english);
                }}>
                <Text>{t('Language.english')}</Text>
              </AwesomeButton>
            )}
            {i18n.language === 'en' && (
              <AwesomeButton
                progress={false}
                width={screenWidth * 0.7}
                height={screenHeight * 0.08}
                style={{marginTop: '2%'}}
                backgroundColor={colors.lightRed}
                backgroundShadow={colors.bittersweet}
                backgroundActive={colors.melon}
                backgroundDarker={colors.bittersweet}
                disabled={showPopup}
                onPressOut={async () => {
                  await handleLanguageChange(Language.spanish);
                }}>
                <Text>{t('Language.spanish')}</Text>
              </AwesomeButton>
            )}
            <AwesomeButton
              progress={false}
              width={screenWidth * 0.2}
              height={screenHeight * 0.08}
              style={{marginTop: '4%'}}
              backgroundColor={colors.lightSeaGreen}
              backgroundShadow={colors.moonstone}
              backgroundActive={colors.cerulean}
              backgroundDarker={colors.moonstone}
              disabled={showPopup}
              onPressOut={() => {
                handlePopup();
              }}>
              <Text style={{fontSize: 18}}>{t('Menu.information')}</Text>
            </AwesomeButton>
          </View>
          {showPopup && <Popup event={handlePopup} />}
        </View>
      ) : (
        <Spinner />
      )}
    </>
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
    fontSize: 15,
    fontWeight: '600',
  },
  lowerViewContainer: {
    flex: 4,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
