import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { useState } from 'react';
import { CreateAccount } from './pages/CreateAccount/CreateAccount';
import { CreateNote } from './pages/CreateNote/CreateNote';
import { UserAccount } from './pages/UserAccount/UserAccount';
import { ThemeContext } from './contexts/ThemeContext';


function App() {
  const [ theme, setTheme ] = useState('light');

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
          <BrowserRouter>
            <AuthContextProvider>
              <Routes>
                <Route path='/'  element={<CreateAccount />} />
                <Route path='account/:id'  element={<UserAccount />} />
                <Route path='account/:id/newnote'  element={<CreateNote />} />
              </Routes>
            </AuthContextProvider>
          </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App;
