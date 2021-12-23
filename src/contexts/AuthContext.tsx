import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import { database } from '../services/firebase'

type User = {
  id: string;
  name: string | null;
  avatar: string | null;
}

type AuthContextType = {
  user: User | undefined;
  signInWithPopup: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType );

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        setUser ({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
      return () => {
        unsubscribe();
      }
  }, [])

  async function signInWithPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const user = {
        id: result.user.uid,
        name: result.user.displayName,
        avatar: result.user.photoURL
      }
      const savedUser = await database.ref(`users/${user.id}`).get()

      if (!savedUser.exists()) {
        await database.ref(`users/${user.id}`).push(user)
      }

      setUser (user)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithPopup }}>
      {props.children}
    </AuthContext.Provider>
  )
}