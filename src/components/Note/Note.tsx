import { ReactNode, useContext } from 'react'
import cx from 'classnames'

import './note.scss'
import { notesStyle } from '../../AppTheme';
import { ThemeContext } from '../../contexts/ThemeContext';

type NoteProps = {
  content: string;
  children?: ReactNode;
  isCorrented?: boolean;
  isDoned?: boolean;
}

export function Note({
  content,
  isCorrented = false,
  isDoned = false,
  children

}: NoteProps) {

  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...notesStyle.transition,
    ...(theme === 'light' ? notesStyle.light : notesStyle.dark)
  }

  return(
    <div
    className={cx(
      'note',
      {doned: isDoned},
      {corrented: isCorrented && !isDoned}  ,
      )}
    >
      <div
        style={themeStyle}
        className="note-content"
        dangerouslySetInnerHTML={{ __html: content }}>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}