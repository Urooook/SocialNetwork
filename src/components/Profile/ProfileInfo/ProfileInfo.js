import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import userBigPhotoProfile from '../../../assets/images/user.png';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) =>{

    if(!props.profile){
        return <Preloader />
    }

    const SetPhoto = (e) =>{
        if(e.target.files.length > 0){
            props.setAvatar(e.target.files[0]);
        }
       
    }

    return(
        <div>
            <img className={s.ProfileBigPhoto} src='https://wallpapershome.ru/images/pages/pic_h/12000.jpg' />
            <div className={s.descriptionBlock}>
                <div>
                <img className={s.profileUserPhoto} src={props.profile.photos.large !== null ? props.profile.photos.large : userBigPhotoProfile } /> 
               
                    {props.isOwner ? <input type='file' onChange={SetPhoto} />  : '' }
                  
                </div>
                <div>
                    <div>
                    <h2>{props.profile.fullName}</h2>
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
                    </div>
                    <div>
                        <p><b>Связаться со мной:</b></p>
                        <p>{props.profile.contacts.vk}</p>
                        <p>{props.profile.contacts.instagram}</p>
                    </div>
                    <div>
                       {props.profile.lookingForAJob ? <div>
                           <p>Ищу работу</p>
                           <p>{props.profile.lookingForAJobDescription}</p>
                       </div> : ''}
                    </div>
                </div>
            </div>
        </div>
 
    );
}

export default ProfileInfo;