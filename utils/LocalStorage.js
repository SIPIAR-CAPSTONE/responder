import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key, value) => {
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    // saving error
  }
};

const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) {
      return null;
    }
    if (typeof value === "object") {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

const deleteItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

export { setItem, getItem, deleteItem };
