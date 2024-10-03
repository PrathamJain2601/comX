import { useEffect } from "react";

export const useDebugger = <T>(value: T) => {
  useEffect(() => {
    console.log(value);

  }, [value]);

  return ;
};