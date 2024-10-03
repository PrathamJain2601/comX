import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: unknown) => {
  
  const setItem = (value: unknown) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting localStorage item:", error);
    }
  };
  
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if(!item) {setItem(initialValue);console.log("Hello")}
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error getting localStorage item:", error);
      return initialValue;
    }
  };
  
  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  };
  
  const [value, setValue] = useState(getItem());

  return { value, setItem, getItem, removeItem };
};
