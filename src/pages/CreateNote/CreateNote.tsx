import { FormEvent, useContext, useState }  from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';

import './createnote.scss'
import { useAuth } from "../../hooks/useAuth";
import { pagesStyles } from "../../AppTheme";
import { database } from "../../services/firebase";
import Header from "../../components/Header/Header";
import { Button } from "../../components/Button/Button";
import {  AsideTop  }  from "../../components/aside-top/aside-top";
import { ThemeContext } from "../../contexts/ThemeContext";

import { notifyNoteSaved } from "../../components/Notifications/Notifications";
import { Toaster } from "react-hot-toast";


export function CreateNote () {
  const [ newNote, setNewNote ] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...pagesStyles.transition,
    ...(theme === 'light' ? pagesStyles.light : pagesStyles.dark)
  }

  async function handleCreateNote (e: FormEvent,) {
    e.preventDefault();

    if (newNote.trim() === ''){
      return;
    }

    notifyNoteSaved()

    const noteInfo = {
      content: newNote,
      isCorrented: false,
      isDoned: false,
    };

    await database.ref(`users/${user?.id}/notes`).push(noteInfo);
    setNewNote("");
  }

  return(
    <div id='page-note' style={themeStyle}>
     <Header/>
      <AsideTop><h1>Crie suas Notes.</h1></AsideTop>
        <main style={themeStyle}>
          <form
            onSubmit={handleCreateNote}
          >
            <Editor
            apiKey='vyaswzc65n3em3ueza0y4pygc9y99b3sjmi425iznt2uvj0u'
            onEditorChange={(newNote) => setNewNote(newNote)}
            value={newNote}
            init={{
              placeholder: 'Crie sua note agora',
              height: 450,
              menubar: false,
              toolbar: ' formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright | bullist numlist | ' +
              'removeformat',
              content_style: ' body { font-size: 20px } p { font-size: 26px } h1 { font-size: 30px } h2 { font-size: 28px } ',
            }}
            />
            <footer>
              <Button
                type='submit'
                isDoned
              >Salvar
              </Button>
              <Button
                className='button cancel'
                onClick= {() => navigate(`/account/${user?.id}`)}
              >Cancelar
              </Button>
            </footer>
          </form>
        </main>
        <Toaster />
    </div>
  )
}