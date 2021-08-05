import React,{useState} from 'react';
import s  from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) =>{

    const [LogoutButton,setLogoutButton] = useState(false);

    const toggleButton = () =>{
        if(LogoutButton){
            setLogoutButton(false);
        }else{
            setLogoutButton(true);
        }
    }

    return(
        <header className={s.header}>
            <div className={s.headerContainer} >
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Circle-icons-browser.svg/1200px-Circle-icons-browser.svg.png' />
        
            <div >
                { props.isAuth ? <div className={s.userName} onClick={toggleButton}>{props.login} {LogoutButton ? <button onClick={props.LogoutThunkCreator}>Выйти</button> : ''}  </div>
                : <NavLink to="/login" >Login</NavLink>    
            }
            </div>
            </div>
        </header>
    );
}

export default Header;