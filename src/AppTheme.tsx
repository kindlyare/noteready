import {CSSProperties} from 'react'

export interface AppTheme {
  dark: CSSProperties;
  light: CSSProperties;
  transition?: CSSProperties;
}

export const headerStyle = {
  dark: {
    backgroundColor: "#494949",
  },

  light: {
    backgroundColor: '#f1f1f1',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },

}

export const buttonsHeaderStyle = {
  dark: {
    color: '#f1f1f1',
    backgroundColor: '#494949',
  },

  light: {
    color: '#494949',
    backgroundColor: '#f1f1f1',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },

}

export const pagesStyles = {
  dark: {
    color: '#f1f1f1',
    backgroundColor: '#2a2627',
  },

  light: {
    color: '#494949',
    backgroundColor: '#f1e3e4',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },
}

export const notesStyle = {
  dark: {
    color: '#2a2627',
  },

  light: {
    color: '#2a2627',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },
}

export const asideStyle = {
  dark: {
    color: '#2a2627',
    backgroundColor: '#f39b6d',
  },

  light: {
    color: '#2a2627',
    backgroundColor: '#aabd8c',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },
}

export const menuStyles = {
  dark: {
    color: '#f1f1f1',
    backgroundColor: '#494949',
  },

  light: {
    color: '#494949',
    backgroundColor: '#f1f1f1',
  },

  transition: {
    transition: 'cubic-bezier(0.68, -0.55, 0.27, 01.55) 420ms',
  },
}


