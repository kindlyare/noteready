import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import '../../styles/global.scss'

export const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    const handleThemeToggle = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return(
      <div>
        <input
          readOnly
          type="checkbox"
          id="switch"
          name="mode"
          checked={theme === 'dark'}
        />
        <label
          htmlFor="switch"
          onClick={handleThemeToggle}
        >
        </label>
      </div>
    )
}