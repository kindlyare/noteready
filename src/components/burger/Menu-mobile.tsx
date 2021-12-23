import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";

import './menu-mobile.scss'

import { useAuth } from "../../hooks/useAuth";
import { FiX } from "react-icons/fi";
import { ThemeToggle } from "../ToggleButton/ToggleButton";
import { menuStyles } from "../../AppTheme";
import { ThemeContext } from "../../contexts/ThemeContext";

interface PopupProps {
  isModal: boolean;
  onBackDropClick: () => void;
}

export const BaseMenuWrapper: React.FC<PopupProps> = ({onBackDropClick, isModal}) => {
  if(!isModal) {
    return null;
  }

  return(<Popup onBackDropClick={onBackDropClick} isModal={false}/>)
}

const Popup: React.FC<PopupProps> = ({onBackDropClick}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleUserAccount() {
    navigate(`/account/${user?.id}`)
  }

  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...menuStyles.transition,
    ...(theme === 'light' ? menuStyles.light : menuStyles.dark)
  }

  return ReactDOM.createPortal (
    <div className='popup' style={themeStyle}>
      <div className="iconCancel">
            <FiX onClick={onBackDropClick}/>
      </div>
      <div className='popup-wrap' style={themeStyle}>
        <ul >
          <h1>Menu</h1>
          <li>
            <div className="notes" onClick={() => handleUserAccount()} style={themeStyle}>Minhas Notas</div>
          </li>
          <div className='toggle'>
            <p>Dark Mode</p><ThemeToggle />
          </div>
          <li>
            <a href="/" style={themeStyle}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
    ,
    document.getElementById('modal-root')!)
}
