import { getProfile,getStatus,updateStatus,setPhotoRequest } from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

let initialState = {
    posts: [
        { id: 1, message: 'Это мой второй пост', likesCount: 15 },
        { id: 2, message: 'Мама, я в Дубае!', likesCount: 4 },
        { id: 3, message: 'Мама, я Шейх', likesCount: 11 }
    ],
    // newPostText:'',
    profile:null,
    status:'',
}

const profileReducer = (state = initialState,action) => {

    switch(action.type){
        case ADD_POST:{
            
            let post = {
                id:4,
                message: action.newPostText,
                likesCount:0
            }
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(post);
            stateCopy.newPostText='';
            return stateCopy;
        }
        case UPDATE_POST_TEXT:{
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFILE:{
            return {...state, profile:action.profile}
        }
        case SET_STATUS:{
            return {...state,status:action.status}
        }
        case SET_USER_PHOTO:{
            debugger;
            return {...state,profile:{...state.profile,photos:action.photos}}
        }
        default:
            return state;
    }   
}

export const setStatus =  (status) =>({type:SET_STATUS,status});

export const setPhotoToProfile = photos =>({type:SET_USER_PHOTO,photos});

export const setUserProfile = (profile) =>{
    return {
        type:SET_USER_PROFILE,
        profile
    }
}

export const addPostActionCreator = (text) =>{
    return {
        type: ADD_POST,newPostText:text
    }
}

// export const updatePostTextActionCreator = text =>{
//     return {
//         type: UPDATE_POST_TEXT,
//         newText:text,
//     }
// }

export const setUserProfileThunkCreator = (userId) =>{
    return (dispatch) =>{
        getProfile(userId)
        
        .then(response=>{
           // console.log(response);
            dispatch(setUserProfile(response));
           
          
        });
    }
}
export const getStatusThunkCreator = userId =>{
    return (dispatch) =>{
        getStatus(userId).then(data =>{
               
            dispatch(setStatus(data));
        });
    }
}

export const updateStatusThunkCreator = status =>{
    return (dispatch) =>{
        updateStatus(status).then(data =>{
            if(data.resultCode !==1){
                 
                dispatch(setStatus(status));
            }
            
        });
    }
}

export const setAvatarTC = file => async (dispatch) =>{
    let response = await setPhotoRequest(file);
    
    if(response.data.resultCode === 0){
        
        dispatch(setPhotoToProfile(response.data.data.photos));
        
    }
}
 

export default profileReducer;