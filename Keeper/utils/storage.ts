import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lock } from '../types/Lock';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    return jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
  } catch (e) {
    // error reading value
  }
};

const storeData = async (value: Lock) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@lock_Object', jsonValue);
  } catch (e) {
    // saving error
  }
};
const removeLockNumberData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    const lock = jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
    if (lock) {
      console.log(lock)
      await deleteData()
      lock.lockNumber = null;
      const newJsonValue = JSON.stringify(lock);
      await AsyncStorage.setItem('@lock_Object', newJsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

const removePasswordData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@lock_Object');
    const lock = jsonValue != null ? (JSON.parse(jsonValue) as Lock) : null;
    if (lock) {
      await deleteData()
      lock.lockCode = null;
      const newJsonValue = JSON.stringify(lock);
      await AsyncStorage.setItem('@lock_Object', newJsonValue);
    }
  } catch (e) {
    // error reading value
  }
};

const deleteData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};


export { getData, storeData, removeLockNumberData, removePasswordData, deleteData }
