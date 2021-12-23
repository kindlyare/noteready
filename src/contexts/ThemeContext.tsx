import { createContext } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: any;
}

export const ThemeContext = createContext({} as ThemeContextProps)
