import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = () =>{
    return(
        <nav className={s.sidebar}>
            <div>
                <NavLink to='/profile' activeClassName={s.activeLink} className={s.item} >Профиль</NavLink>
            </div>
            <div>
                <NavLink to='/news' activeClassName={s.activeLink} className={s.item}>Новости</NavLink>
            </div>
            <div>
                <NavLink to='/dialogs' activeClassName={s.activeLink} className={s.item}>Сообщения</NavLink>
            </div>
            <div>
                <NavLink to='/users' activeClassName={s.activeLink} className={s.item}>Пользователи</NavLink>
            </div>
            <div>
                <NavLink to='/music' activeClassName={s.activeLink} className={s.item}>Музыка</NavLink>
            </div>
            <div>
                <NavLink to='/weather' activeClassName={s.activeLink} className={s.item}>Погода</NavLink>
            </div>
            <div>
                <NavLink to='/settings' activeClassName={s.activeLink} className={s.item}>Настройки</NavLink>
            </div>
        </nav>
    );
}

export default NavBar;