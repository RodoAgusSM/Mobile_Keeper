import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import BottomSheet from '@gorhom/bottom-sheet';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  screenHeight,
  screenWidth,
  getData,
  removePasswordData,
  deleteData,
  colors,
} from '../utils/index';
import {Lock} from '../types/Lock';

export const Code = ({route, navigation}: any) => {
  const {t, i18n} = useTranslation();

  const {updateScreen} = route?.params ?? false;
  const [openBottomSheet, setOpenBottomSheet] = React.useState<boolean>(false);
  const [storage, setStorage] = React.useState<Lock>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    fetchStorage();
  });

  useEffect(() => {
    if (!openBottomSheet) {
      bottomSheetRef.current?.close();
    } else if (openBottomSheet) {
      bottomSheetRef.current?.expand();
    }
  }, [openBottomSheet]);

  const fetchStorage = async () => {
    const data = (await getData()) as Lock;
    setStorage(data);
  };

  const handleResetPassword = async () => {
    await removePasswordData();
    setOpenBottomSheet(false);
    navigation.navigate('Locker', {
      passwordLength: storage?.lockLenght,
      lockerNumber: storage?.lockerNumber,
    });
  };

  const handleChangeLocker = async () => {
    await deleteData();
    setOpenBottomSheet(false);
    navigation.navigate('Home');
  };

  if (updateScreen && !storage) {
    fetchStorage();
  }

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
            width: '95%',
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '4%',
            borderWidth: 1,
            borderRadius: 10,
            backgroundColor: colors.peach,
          }}>
          <View
            style={{
              width: '100%',
              height: '35%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '800',
              }}>
              {t('Code.lockerNumber')}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.cerulean,
                textDecorationLine: 'underline',
              }}>
              {storage?.lockerNumber}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '35%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 22, fontWeight: '800'}}>
              {t('Code.passcode')}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: colors.cerulean,
                textDecorationLine: 'underline',
              }}>
              {storage?.lockCode}
            </Text>
          </View>
        </View>
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
      <BottomSheet
        onClose={() => setOpenBottomSheet(false)}
        ref={bottomSheetRef}
        index={openBottomSheet ? 0 : -1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={{backgroundColor: 'transparent'}}
        backgroundStyle={{
          borderTopStartRadius: 22,
          borderTopEndRadius: 22,
          backgroundColor: colors.papayaWhite,
        }}
        onChange={() => handleSheetChanges}>
        <Text
          style={{
            marginTop: '5%',
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {t('BottomSheet.settings')}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            onPress={async () => {
              await handleResetPassword();
            }}>
            <Text>{t('BottomSheet.resetPassword')}</Text>
          </AwesomeButton>
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            style={{margin: 25}}
            onPress={async () => {
              await handleChangeLocker();
            }}>
            <Text>{t('BottomSheet.changeLocker')}</Text>
          </AwesomeButton>
          {i18n.language === 'sp' && (
            <AwesomeButton
              progress={false}
              width={screenWidth * 0.55}
              height={screenHeight * 0.08}
              backgroundColor={colors.sunset}
              backgroundShadow={colors.xanthous}
              backgroundActive={colors.peach}
              backgroundDarker={colors.xanthous}
              onPressOut={() => {
                i18n.changeLanguage('en');
              }}>
              <Text>{t('Language.english')}</Text>
            </AwesomeButton>
          )}
          {i18n.language === 'en' && (
            <AwesomeButton
              progress={false}
              width={screenWidth * 0.55}
              height={screenHeight * 0.08}
              backgroundColor={colors.sunset}
              backgroundShadow={colors.xanthous}
              backgroundActive={colors.peach}
              backgroundDarker={colors.xanthous}
              onPressOut={() => {
                i18n.changeLanguage('sp');
              }}>
              <Text>{t('Language.spanish')}</Text>
            </AwesomeButton>
          )}
        </View>
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
    backgroundColor: colors.floralWhite,
  },
});
