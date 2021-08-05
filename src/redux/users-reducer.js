import { getUsers,FollowToUser,UnfollowToUser } from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOTAL_USER_COUNT = 'TOTAL_USER_COUNT';
const TOGGLE_FETCHING= 'TOGGLE_FETCHING';
const FOLLOWING_IN_PROGRESS = 'FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [
        // { id: 1, followed:true, status:'Жив,цел,орел', location:{city:'Moscow',country:'Russia'},name:'Кирилл',UserImg:'https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg' },
        // { id: 2,followed:false, status:'Меня легко найти', location:{city:'Тамбов',country:'Russia'},name:'Коля',UserImg:'https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg' },
        // { id: 3,followed:true, status:'Ваканда навеки', location:{city:'Орел',country:'Russia'},name:'Динар',UserImg:'https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg' },
    ],
    pageSize:15,
    portionSize:15,
    totalCount:0,
    currentPage:1,
    isFetching:false,
    followingInProgress:[],
}

const usersReducer = (state = initialState,action) => {

    switch(action.type){
        case FOLLOW:{
            return{
                ...state,
                users : state.users.map(u=>{
                    if(u.id === action.id){
                        return {...u,followed: false}
                    }
                    return u;
                })
            }
        }
        case UNFOLLOW:{
            return{
                ...state,
                users : state.users.map(u=>{
                    if(u.id === action.id){
                         return {...u,followed: true}
                    }
                    return u;
                })
            }
        }
        case SET_USERS:{
            return {...state,users:action.users}
        }
        case SET_CURRENT_PAGE:{
            return {...state,currentPage:action.currentPage}
        }
        case TOTAL_USER_COUNT:{
            return {...state,totalCount:action.count}
        }
        case TOGGLE_FETCHING:{
            return {...state,isFetching:action.isFetching}
        }
        case FOLLOWING_IN_PROGRESS:{
            return {...state, 
            followingInProgress: action.followingInProgress
            ? [...state.followingInProgress,action.userId]
            : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        
        default:
            return state;
    }   
}
export const FollowingInProgress = (followingInProgress,userId) =>({type:FOLLOWING_IN_PROGRESS,followingInProgress,userId});


export const toggleIsFetching = (isFetching)=>({type:TOGGLE_FETCHING,isFetching:isFetching});

export const totalUserCount = (count) =>{
    return {
        type: TOTAL_USER_COUNT,
        count:count,
    }
}

export const  updateCurrentPage = (newPage) =>{
    return {
        type: SET_CURRENT_PAGE,
        currentPage:newPage
    }
}

export const follow = (id) =>{
    return {
        type: FOLLOW,
        id:id
    }
}
export const unfollow = (id) =>{
    return {
        type: UNFOLLOW,
        id:id
    }
}
export const setUsers = users =>{
    return {
        type:SET_USERS,
        users:users
    }
}

export const getUsersThunkCreator = (pageSize,currentPage) =>{
    return (dispatch) =>{
        dispatch(toggleIsFetching(true));
        if(currentPage !== 1){
            dispatch(updateCurrentPage(currentPage));
        }else{
            dispatch(updateCurrentPage(1));
        }
        getUsers(pageSize,currentPage)
        .then(data=>{
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(totalUserCount(data.totalCount));
        });

    }
}

export const followThunkCreator = (userId=1)=>{
    return (dispatch) =>{
        dispatch(FollowingInProgress(true,userId));
        FollowToUser(userId)
                                .then(data => {
                                   
                                    if(data.resultCode === 0){
                                        // debugger
                                        dispatch(unfollow(userId));
                                    }
                                    
                                });
                                dispatch(FollowingInProgress(false,userId));
    }
}

export const unfollowThunkCreator = (userId=1)=>{
    return (dispatch) =>{
        dispatch(FollowingInProgress(true,userId));
        UnfollowToUser(userId)
                                .then(data => {
                                   
                                    if(data.resultCode === 0){
                                        // debugger
                                        dispatch(follow(userId));
                                    }
                                    
                                });
                                dispatch(FollowingInProgress(false,userId));
    }
}

export default usersReducer;