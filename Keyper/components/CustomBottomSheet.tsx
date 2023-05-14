import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AwesomeButton from 'react-native-really-awesome-button';
import {
  screenHeight,
  screenWidth,
  colors,
  handleLanguageChange,
} from '../utils/index';
import {useTranslation} from 'react-i18next';
import {UserPreferences} from '../types/UserPreferences';
import {Language} from '../enums/Index';

type BottomSheetProps = {
  openBottomSheet: any;
  setOpenBottomSheet: any;
  handleChangeLocker?: any;
  handleChangePassword?: any;
  handleEraseLocker: any;
};

export const CustomBottomSheet = (bottomSheetProps: BottomSheetProps) => {
  const {t, i18n} = useTranslation();
  const {
    openBottomSheet,
    setOpenBottomSheet,
    handleChangeLocker,
    handleChangePassword,
    handleEraseLocker,
  } = bottomSheetProps;

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

  return (
    <BottomSheet
      onClose={() => setOpenBottomSheet(false)}
      ref={bottomSheetRef}
      index={openBottomSheet ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      style={{backgroundColor: 'transparent'}}
      backgroundStyle={CustomBottomSheetStyles.bottomSheetBackgroundStyle}
      onChange={() => handleSheetChanges}>
      <Text style={CustomBottomSheetStyles.settingsTitleTxt}>
        {t('BottomSheet.settings')}
      </Text>
      <View style={CustomBottomSheetStyles.bottomSheetView}>
        {handleChangePassword && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            onPress={async () => {
              await handleChangeLocker();
            }}>
            <Text style={CustomBottomSheetStyles.labeltxt}>
              {t('BottomSheet.changeLocker')}
            </Text>
          </AwesomeButton>
        )}
        {handleChangePassword && (
          <AwesomeButton
            progress={false}
            width={screenWidth * 0.55}
            height={screenHeight * 0.08}
            backgroundColor={colors.sunset}
            backgroundShadow={colors.xanthous}
            backgroundActive={colors.peach}
            backgroundDarker={colors.xanthous}
            onPress={async () => {
              await handleChangePassword();
            }}>
            <Text style={CustomBottomSheetStyles.labeltxt}>
              {t('BottomSheet.changePassword')}
            </Text>
          </AwesomeButton>
        )}
        <AwesomeButton
          progress={false}
          width={screenWidth * 0.55}
          height={screenHeight * 0.08}
          backgroundColor={colors.sunset}
          backgroundShadow={colors.xanthous}
          backgroundActive={colors.peach}
          backgroundDarker={colors.xanthous}
          onPress={async () => {
            await handleEraseLocker();
          }}>
          <Text style={CustomBottomSheetStyles.labeltxt}>
            {t('BottomSheet.eraseLocker')}
          </Text>
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
            onPressOut={async () => {
              await handleLanguageChange(Language.english);
            }}>
            <Text style={CustomBottomSheetStyles.labeltxt}>
              {t('Language.english')}
            </Text>
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
            onPressOut={async () => {
              await handleLanguageChange(Language.spanish);
            }}>
            <Text style={CustomBottomSheetStyles.labeltxt}>
              {t('Language.spanish')}
            </Text>
          </AwesomeButton>
        )}
      </View>
    </BottomSheet>
  );
};

const CustomBottomSheetStyles = StyleSheet.create({
  bottomSheetBackgroundStyle: {
    borderTopStartRadius: 22,
    borderTopEndRadius: 22,
    backgroundColor: colors.papayaWhite,
  },
  settingsTitleTxt: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.plumPurple,
  },
  bottomSheetView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  labeltxt: {
    fontWeight: '700',
    color: colors.plumPurple,
  },
});
