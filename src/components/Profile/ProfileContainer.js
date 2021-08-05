import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile,setUserProfileThunkCreator,getStatusThunkCreator,updateStatusThunkCreator,setAvatarTC } from '../../redux/profile-reducer';
import Profile from './Profile';
import * as axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{

    refreshUser(){
        let userId = this.props.match.params.userId;
        if(!userId){
       
                userId = this.props.userId;
            
            
        }
        this.props.setUserProfileThunkCreator(userId);
        this.props.getStatusThunkCreator(userId);
    }

    componentDidMount(){
        
       this.refreshUser();
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
        // .then(response=>{
            
        //     this.props.setUserProfile(response.data);
           
          
        // });
    }

    componentDidUpdate(prevProps, prevState, snapshot){
     
            if(this.props.match.params.userId != prevProps.match.params.userId){
                this.refreshUser();
            }
    }

    render(){
        
        return(
            <Profile {...this.props} 
            profile={this.props.profile} 
            status={this.props.status}
             updateStatus={this.props.updateStatusThunkCreator}
             isOwner ={!this.props.match.params.userId}
             setAvatar={this.props.setAvatarTC}
             />
        )
    }
}

let mapStateToProps = (state) =>{
    
    return{
        profile: state.ProfilePage.profile,
        userId: state.auth.id,
        isAuth: state.auth.isAuth,
        status: state.ProfilePage.status,
    }
    
}



export default compose(
    connect(mapStateToProps,{ setUserProfile,setUserProfileThunkCreator,getStatusThunkCreator,updateStatusThunkCreator,setAvatarTC }),
   
    withRouter,
    withAuthRedirect,
)(ProfileContainer);