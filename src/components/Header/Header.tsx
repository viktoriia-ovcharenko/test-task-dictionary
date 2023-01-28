import './Header.scss';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [isChoosen, setIsChoosen] = useState('Home');

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item ">
            <NavLink
              to="/"
              className={classNames('nav__link', {
                'is-active': isChoosen === 'Home',
              })}
              onClick={() => setIsChoosen('Home')}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/newWord"
              className={classNames('nav__link', {
                'is-active': isChoosen === 'NewWord',
              })}
              onClick={() => setIsChoosen('NewWord')}
            >
              New Word
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/test"
              className={classNames('nav__link', {
                'is-active': isChoosen === 'Test',
              })}
              onClick={() => setIsChoosen('Test')}
            >
              Test
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
