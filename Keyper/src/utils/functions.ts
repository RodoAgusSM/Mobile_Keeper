import { Language, Screen } from '@/enums/Index';
import i18n from '@/translations/index';
import { UserPreferences } from '@/types/UserPreferences';
import { deleteData, storeUserPreferencesData } from '@/utils/storage';

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
