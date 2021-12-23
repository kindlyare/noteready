import React, { MouseEventHandler, ReactChildren, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { buttonsHeaderStyle, headerStyle } from "../../AppTheme";
import { useAuth } from "../../hooks/useAuth";
import logoDark from '../../assets/images/logo-dark.svg'
import {  FiMenu } from 'react-icons/fi'

import { ThemeToggle } from "../ToggleButton/ToggleButton";
import { BaseMenuWrapper } from "../burger/Menu-mobile";
import { ThemeContext } from "../../contexts/ThemeContext";

 const Header = () => {

  return(
      <NavBar >
        <NavItem>
          <DropDownMenu />
        </NavItem>
      </NavBar>
  )
}

function NavBar(props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...headerStyle.transition,
    ...(theme === 'light' ? headerStyle.light : headerStyle.dark)
  }

  return(
    <nav className='navbar' style={themeStyle}>
      <ul className='navbar-nav'>
        {props.children}
      </ul>
    </nav>
  )
}

function NavItem(props: { children: boolean | React.ReactChild | undefined | null; }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleUserAccount() {
    navigate(`/account/${user?.id}`)
  }

  const [ isModal, setIsModal ] = useState(false);

  const toggleModal = () => {
    setIsModal(wasIsModal => !wasIsModal)
  }

  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...buttonsHeaderStyle.transition,
    ...(theme === 'light' ? buttonsHeaderStyle.light : buttonsHeaderStyle.dark)
  }

  return(
    <div>
      <li className='nav-item' style={themeStyle}>
        <div className="logo-container">
          <img onClick={() => handleUserAccount()} src={logoDark} alt="logo" />
        </div>
        <div className='toggle'>
          <p>Dark Mode</p><ThemeToggle />
        </div>
        <a href="#" className='icon-button' onClick={() => setOpen(!open)}>
          <img src={user?.avatar as string} alt='' />
          <span style={themeStyle}>{user?.name}</span>
        </a>
        <div className="menu-container">
          <FiMenu
            className='menu-mobile'
            onClick={() => toggleModal()}>
          </FiMenu>
        </div>
        <BaseMenuWrapper
          isModal={isModal}
          onBackDropClick={toggleModal}>
        </BaseMenuWrapper>
        {open && props.children}
      </li>
    </div>
  )
}

function DropDownMenu() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const themeStyle = {
    ...buttonsHeaderStyle.transition,
    ...(theme === 'light' ? buttonsHeaderStyle.light : buttonsHeaderStyle.dark)
  }

  function handleLeave() {
    navigate(`/`)
  }

  function handleUserAccount() {
    navigate(`/account/${user?.id}`)
  }

  function DropdownItem(
    props: {
      children: ReactChildren | string | undefined
      onClick: MouseEventHandler
    }
  ) {
    return(
      <a onClick={props.onClick} className='menu-item' >
        {props.children}
      </a>
    )
  }

  return(
    <div className='dropdown' style={themeStyle}>
      <DropdownItem onClick={handleUserAccount}> Minhas Notas </DropdownItem>
      <DropdownItem onClick={handleLeave}> logout </DropdownItem>
    </div>
  )
}

export default Header