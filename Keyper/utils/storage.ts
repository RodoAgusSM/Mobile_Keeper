import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lock } from '../types/Lock';
import { UserPreferences } from '../types/UserPreferences';

const getLockData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    return jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
  } catch (e) {
    // error reading value
  }
};

const storeLockData = async (value: Lock) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@lock_Object', jsonValue);
  } catch (e) {
    // saving error
  }
};

const storeLockNumberData = async (value: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    const lock = jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
    if (lock) {
      await removeLocker()
      lock.lockNumber = value;
      const newJsonValue = JSON.stringify(lock);
      await AsyncStorage.setItem('@lock_Object', newJsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

const removeLockNumberData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    const lock = jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
    if (lock) {
      await removeLocker()
      lock.lockNumber = null;
      const newJsonValue = JSON.stringify(lock);
      await AsyncStorage.setItem('@lock_Object', newJsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

const removeLocker = async () => {
  try {
    await AsyncStorage.removeItem("@lock_Object");
  } catch (e) {
    // clear error
  }
};

const deleteData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

const getUserPreferencesData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userPrefetences_Object');
    return jsonValue != null ? (JSON.parse(jsonValue) as UserPreferences) : null;
  } catch (e) {
    // error reading value
  }
};

const storeUserPreferencesData = async (value: UserPreferences) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userPrefetences_Object', jsonValue);
  } catch (e) {
    // saving error
  }
};


export { getLockData, storeLockData, storeLockNumberData, removeLockNumberData, removeLocker, deleteData, getUserPreferencesData, storeUserPreferencesData }
