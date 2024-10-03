import { useEffect } from "react";

export const useDebugger = (condition:any) => {
    useEffect(() => {
      if (condition) {
        console.log('Debugging...');
      }
    }, [condition]);
  };