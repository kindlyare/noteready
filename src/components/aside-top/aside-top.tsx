import { ReactElement, useContext } from "react";
import { asideStyle } from "../../AppTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

import './aside-top.scss'

type asideProps = {
  children: ReactElement
}

export function AsideTop({ children }: asideProps) {

  const { theme } = useContext(ThemeContext);

  const asideStyles = {
    ...asideStyle.transition,
    ...(theme === 'light' ? asideStyle.light : asideStyle.dark)
  }

  return(
      <div className='aside-top-container'>
        <div className='aside-top' style={asideStyles}>
          {children}
        </div>
      </div>
  )
}
