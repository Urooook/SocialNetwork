
import { stopSubmit } from "redux-form";
import { authMe,getProfile, login, logout,captchaRequest  } from "../api/api";
import { setUserProfile } from './profile-reducer';

const SET_AUTH_USER = 'SET_AUTH_USER';
const CAPTCHA_USER_SUCCESS = 'CAPTCHA_USER_SUCCESS';

let initialState = {
    login:null,
    email:null,
    id:null,
    isAuth:false,
    captcha:null
};

const AuthReducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_AUTH_USER:{
            return {...state,...action.data}
        }
        case CAPTCHA_USER_SUCCESS:{
            return {...state,captcha:action.captcha}
        }
        default:
            return state;
    }
}

export const setCaptcha = (captcha) =>({type:CAPTCHA_USER_SUCCESS,captcha});

export const setAuthUser = (login,email,id,isAuth) =>{
    return {
        type: SET_AUTH_USER,
        data:{login,email,id,isAuth}
    }
}

export const AuthMeThunkCreator = ()=>(dispatch)=>{
    
      return  authMe()
        .then(data=>{
            
            if(data.resultCode === 0){
               let isAuth=true;
                let {email,id,login} = data.data;
                
                getProfile(id)
                .then(data=>{
                   
               dispatch(setUserProfile(data));

            dispatch(setAuthUser(login,email,id,isAuth));
            
           
            
        });
            }
            
           
          
        });
    
}

export const captchaTC = () => async (dispatch)=>{
    const response = await captchaRequest();
    const capthaUrl = response.data.url;
    
    dispatch(setCaptcha(capthaUrl));
}

export const LoginThunkCreator = (email,password,rememberMe=false,captcha)=>{

   
    return (dispatch) =>{
        login(email,password,rememberMe,captcha)
        .then(data=>{
            
            //debugger
            if(data.resultCode === 0){
               // debugger
                dispatch(AuthMeThunkCreator());
            }else{
                if(data.resultCode === 10){
                    dispatch(captchaTC());
                }
                let action = stopSubmit("login",{_error:"Логин или пароль введены неверно"});
                 dispatch(action);
            }
        });     
        
    }
}
export const LogoutThunkCreator = ()=>{

    
    return (dispatch) =>{
        logout()
        .then(data=>{
            
            //debugger
            if(data.resultCode === 0){
               // debugger
                dispatch(setAuthUser(null,null,null,false));
            }
        });     
        
    }
}

export default AuthReducer;