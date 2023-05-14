import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet, Linking} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';
import {colors, screenHeight, screenWidth} from '../utils/index';

type PopupProps = {
  event: any;
};

export const Popup = (handlePopup: PopupProps) => {
  const {event} = handlePopup;
  const {t} = useTranslation();
  return (
    <View style={popupStyles.superMainContainer}>
      <View style={popupStyles.container}>
        <Text style={popupStyles.engineerInfoTxt}>
          {t('Info.engineerInfo')}
        </Text>
        <View style={popupStyles.mediaView}>
          <Text
            style={popupStyles.hiperlinkNameTxt}
            onPress={() => Linking.openURL(t('Info.githubURL'))}>
            {t('Info.githubMedia')} {': '}
          </Text>
          <Text
            style={popupStyles.hiperlinkTxt}
            onPress={() => Linking.openURL(t('Info.githubURL'))}>
            {t('Info.github')}
          </Text>
        </View>
        <View style={popupStyles.mediaView}>
          <Text
            style={popupStyles.hiperlinkNameTxt}
            onPress={() => Linking.openURL(t('Info.githubURL'))}>
            {t('Info.instagramMedia')} {': '}
          </Text>
          <Text
            style={popupStyles.hiperlinkTxt}
            onPress={() => Linking.openURL(t('Info.instagramURL'))}>
            {t('Info.instagram')}
          </Text>
        </View>
        <View style={popupStyles.mediaView}>
          <Text
            style={popupStyles.hiperlinkNameTxt}
            onPress={() => Linking.openURL(t('Info.githubURL'))}>
            {t('Info.twitterMedia')} {': '}
          </Text>
          <Text
            style={popupStyles.hiperlinkTxt}
            onPress={() => Linking.openURL(t('Info.twitterURL'))}>
            {t('Info.twitter')}
          </Text>
        </View>
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.22}
          height={screenHeight * 0.08}
          style={{marginTop: '12%'}}
          backgroundColor={colors.lightSeaGreen}
          backgroundShadow={colors.moonstone}
          backgroundActive={colors.cerulean}
          backgroundDarker={colors.moonstone}
          onPressOut={() => {
            event();
          }}>
          <Text style={popupStyles.labeltxt}>{t('Info.close')}</Text>
        </AwesomeButton>
      </View>
    </View>
  );
};

const popupStyles = StyleSheet.create({
  superMainContainer: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.floralWhite,
  },
  container: {
    width: screenWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.peach,
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
  },
  engineerInfoTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.plumPurple,
    marginBottom: 20,
    textAlign: 'center',
  },
  mediaView: {flexDirection: 'row', flexWrap: 'wrap'},
  hiperlinkNameTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.plumPurple,
  },
  hiperlinkTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.cerulean,
    textDecorationLine: 'underline',
  },
  labeltxt: {
    fontWeight: '700',
    color: colors.plumPurple,
  },
});
