import React from 'react';
import { connect } from 'react-redux';
import { setAuthUser,AuthMeThunkCreator,LogoutThunkCreator } from '../../redux/auth-reducer';
import { setUserProfile } from '../../redux/profile-reducer';
import Header from './Header';
import * as axios from 'axios';

class HeaderContainer extends React.Component{

    
    render(){
       return <Header {...this.props} />
    }
}



let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {setAuthUser,setUserProfile,AuthMeThunkCreator,LogoutThunkCreator})(HeaderContainer);