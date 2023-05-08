import { Language } from "../enums/Index";
import i18n from "../translation";
import { UserPreferences } from "../types/UserPreferences";
import { deleteData, storeUserPreferencesData } from "./storage";

export const handleLanguageChange = async (language: Language) => {
    const userPreferences: UserPreferences = {
        language,
    };
    await storeUserPreferencesData(userPreferences);
    i18n.changeLanguage(language);
};

export const handleEraseLocker = async (navigation: any, setOpenBottomSheet: any) => {
    await deleteData();
    setOpenBottomSheet(false);
    navigation.navigate('Home');
};