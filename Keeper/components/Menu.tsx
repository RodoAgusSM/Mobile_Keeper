import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, getData, screenHeight, screenWidth} from '../utils/index';
import AwesomeButton from 'react-native-really-awesome-button';
import {Lock} from '../types/Lock';
import {Popup} from './Popup';

export const Menu = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

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
            style={{marginTop: '2%'}}
            backgroundColor={colors.lightRed}
            backgroundShadow={colors.bittersweet}
            backgroundActive={colors.melon}
            backgroundDarker={colors.bittersweet}
            disabled={showPopup}
            onPressOut={() => {
              i18n.changeLanguage('sp');
            }}>
            <Text>{t('Language.spanish')}</Text>
          </AwesomeButton>
        )}
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.15}
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
    width: '95%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subUpperViewContainer: {
    width: '100%',
    height: '50%',
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
    marginBottom: 10,
    borderRadius: 10,
  },
});
