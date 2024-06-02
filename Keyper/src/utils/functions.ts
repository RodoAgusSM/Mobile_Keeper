import i18n from '@/translations/index';
import { deleteData, storeUserPreferencesData } from '@/utils/storage';
import { Language, Screen } from '@/enums/Index';
import { UserPreferences } from '@/types/UserPreferences';

export const handleLanguageChange = async (language: Language) => {
    const userPreferences: UserPreferences = {
        language,
    };
    await storeUserPreferencesData(userPreferences);
    i18n.changeLanguage(language);
};

export const handleEraseLocker = async (
    navigation: any,
    setOpenBottomSheet: any,
) => {
    await deleteData();
    setOpenBottomSheet(false);
    navigation.navigate(Screen.home);
};
