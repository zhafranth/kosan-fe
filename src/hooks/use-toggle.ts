import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(!value);

  return { isOpen: value, toggle } as const;
};
