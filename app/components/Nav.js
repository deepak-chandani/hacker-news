import React from 'react'
import {useTheme} from '../contexts/theme'
import {NavLink} from 'react-router-dom'

const activeStyle = {
  color: 'rgb(187, 46, 31)'
}

export default function Nav() {
  const {theme, toggleTheme} = useTheme();

  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <NavLink
            to='/'
            exact
            activeStyle={activeStyle}
            className='nav-link'>
            Top
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/new'
            activeStyle={activeStyle}
            className='nav-link'>
            New
          </NavLink>
        </li>
      </ul>
      <button
        style={{fontSize: 30}}
        className='btn-clear'
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  )
}
