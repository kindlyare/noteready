import { useNavigate } from 'react-router-dom'

import logoDark from '../../assets/images/logo-dark.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import './auth.scss'

import { useAuth } from '../../hooks/useAuth'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { pagesStyles } from '../../AppTheme'
import { ThemeToggle } from '../../components/ToggleButton/ToggleButton'

export function CreateAccount() {
  const navigate = useNavigate();
  const { user, signInWithPopup } = useAuth();
  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...pagesStyles.transition,
    ...(theme === 'light' ? pagesStyles.light : pagesStyles.dark)
  }

  async function handleCreateUser() {
    if(!user) {
      await signInWithPopup()
    }

    navigate(`/account/${user?.id}`)
  }

    return(
    <div>
      <div id="page-auth" style={themeStyle}>
        <main>
          <div className="main-content">
            <img className='logo-content' src={logoDark} alt="Noteready." />
            <p>Dark Mode</p><ThemeToggle />
            <button
              onClick={handleCreateUser}
              className="create-room"
            >
              <img src={googleIconImg} alt="Logo do google" />
              entre com o Google
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
