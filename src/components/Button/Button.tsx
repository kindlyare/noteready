import { ButtonHTMLAttributes } from 'react';

import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isDoned?: boolean
};

export function Button({isDoned = false, ...props}: ButtonProps) {
  return (
    <button
      className={`button ${isDoned? 'doned' : ''}`}
      {...props}
    />
  )
}
