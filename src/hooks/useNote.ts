import { useEffect, useState } from "react"
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseNotes = Record<string, {
  content: string;
  isCorrented: boolean;
  isDoned: boolean;
}>

type NoteProps = {
  id: string;
  content: string;
  isCorrented: boolean;
  isDoned: boolean;
}


export function useNote (noteId: string) {
  const { user } = useAuth();
  const [ notes, setNotes] = useState<NoteProps[]>([])

  useEffect(() => {
    const noteRef = database.ref(`/users/${user?.id}`) // erro colocar 'tudo'

    noteRef.on('value', note =>{
      const databaseNote = note.val();

      const firebaseNotes: FirebaseNotes = databaseNote.notes ?? {};
      const parsedNotes = Object.entries(firebaseNotes).map(([key, value]) => {
        return{
          id: key,
          content: value.content,
          isCorrented: value.isCorrented,
          isDoned: value.isDoned
        };
      })

      setNotes(parsedNotes)

    })

    return() => {
      noteRef.off('value')
    }

  }, [noteId, user?.id]);

  return{notes}
}