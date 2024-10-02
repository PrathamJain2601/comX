import { useState } from "react";

export const useLocalStorage = (key: string) => {
    let temp:unknown;
    const [value,setValue] = useState(temp);

    const setItem = (value: unknown) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
      } catch (error) {
        console.log(error);
      }
    };
  
    const getItem = () => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined ;
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeItem = () => {
      try {
        window.localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { value,setItem, getItem, removeItem };
  };