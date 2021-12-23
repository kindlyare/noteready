import { FiCheck, FiX, FiZap, FiPlus } from 'react-icons/fi'
import { useContext } from "react"
import { useNavigate, useParams } from "react-router"

import './user.scss'
import '../../components/Header/header.scss'

import { ThemeContext } from '../../contexts/ThemeContext'
import { useAuth } from '../../hooks/useAuth'
import { useNote } from '../../hooks/useNote'
import { pagesStyles } from '../../AppTheme'
import Header from '../../components/Header/Header'
import { Note } from '../../components/Note/Note'
import {  AsideTop  } from '../../components/aside-top/aside-top'
import { database } from '../../services/firebase'
import { notifyNoteCorrent, notifyNoteFinish, notifyNoteRemoved } from '../../components/Notifications/Notifications'
import { Toaster } from 'react-hot-toast'
import { NoNote } from '../../components/no-note/no-note'


export function UserAccount () {
  const { user } = useAuth()
  const navigate = useNavigate();
  const params = useParams();
  const noteId = params.id;

  async function handleDonedNote(noteId: string) {
    await database.ref(`users/${user?.id}/notes/${noteId}`).update({
      isDoned: true,
    });
  }

  async function handleCorrentedNote(noteId: string) {
    await database.ref(`users/${user?.id}/notes/${noteId}`).update({
      isCorrented: true,
    });
  }

  async function handleDeleteNote(noteId: string) {
    await database.ref(`users/${user?.id}/notes/${noteId}`).remove();
  };

  const { notes } = useNote( noteId as string);
  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...pagesStyles.transition,
    ...(theme === 'light' ? pagesStyles.light : pagesStyles.dark)
  }

  function handleNewNote () {
    navigate(`newnote`)
  }

  return(
    <div id='page-user' style={themeStyle}>
      <Header />
      <AsideTop ><h1>Minhas Notes.</h1></AsideTop>
      <main style={themeStyle}>
        <div className='create-note'>
          <button onClick={handleNewNote}><FiPlus /></button>
        </div>
        <div className='note-list'> 
        {!notes.length && <NoNote/> }
        {notes.map(note => {
          return(
            <Note
              key={note.id}
              content={note.content}
              isCorrented={note.isCorrented}
              isDoned={note.isDoned}
            >
            <div className="note-actions">
            {!note.isDoned && (
              <>
                <button
                  className='done-button'
                  type='button'
                  onClick={() => notifyNoteFinish() && handleDonedNote(note.id)}
                >
                <span className='background-done'>
                  <FiCheck />
                </span>
                </button>
                <button
                  className='current-button'
                  type='button'
                  onClick={() => notifyNoteCorrent() && handleCorrentedNote(note.id)}
                >
                <span className='background-current'>
                  <FiZap />
                </span>
                </button>
                </>
            )}
            <button
              className='remove-button'
              type='button'
              onClick={() => notifyNoteRemoved() && handleDeleteNote(note.id)}
            >
              <span className='background-remove'>
                <FiX />
              </span>
            </button>
            </div>
            </Note>
          );
          })}
        </div>
      </main>
      <Toaster />
    </div>
  )
}
