import { useState } from "react";

export function useInputHook<T>(initialValue: T): [T, (partialT: Partial<T>) => void] {
    const [value, setValue] = useState<T>(initialValue);
  
    const setValuePartial = (partialT: Partial<T>) => {
      setValue((prevValue) => ({
        ...prevValue,
        ...partialT
      }));
    };
  
    return [value, setValuePartial];
  }