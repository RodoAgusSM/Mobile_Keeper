import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, getData, screenHeight, screenWidth} from '../utils/index';
import AwesomeButton from 'react-native-really-awesome-button';
import {Lock} from '../types/Lock';

export const Menu = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  console.log(i18n.language);
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
        <Text style={homeStyles.header}>{t('Menu.selectTypeOfLocker')}</Text>
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
          <Text>{t('Menu.Lockpad')}</Text>
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
          <Text>{t('Menu.electronicCombinationLock')}</Text>
        </AwesomeButton>
        {i18n.language === 'sp' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.7}
            height={screenHeight * 0.08}
            style={{marginTop: '10%'}}
            backgroundColor={colors.lightRed}
            backgroundShadow={colors.bittersweet}
            backgroundActive={colors.melon}
            backgroundDarker={colors.bittersweet}
            onPressOut={() => {
              i18n.changeLanguage('en');
            }}>
            <Text>{t('Language.english')}</Text>
          </AwesomeButton>
        )}
        {i18n.language === 'en' && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.7}
            height={screenHeight * 0.08}
            style={{marginTop: '10%'}}
            backgroundColor={colors.lightRed}
            backgroundShadow={colors.bittersweet}
            backgroundActive={colors.melon}
            backgroundDarker={colors.bittersweet}
            onPressOut={() => {
              i18n.changeLanguage('sp');
            }}>
            <Text>{t('Language.spanish')}</Text>
          </AwesomeButton>
        )}
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
    marginBottom: '25%',
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
