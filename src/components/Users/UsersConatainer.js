import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import * as axios from 'axios';
import s from './Users.module.css';
import userImg from '../../assets/images/user.png';
import {follow,unfollow,setUsers, updateCurrentPage,totalUserCount,toggleIsFetching,FollowingInProgress,getUsersThunkCreator,unfollowThunkCreator,followThunkCreator } from '../../redux/users-reducer';
import Preloader from '../../components/common/Preloader/Preloader';
import { NavLink, Redirect } from 'react-router-dom';
import { getUsers } from '../../api/api';
import { UnfollowToUser,FollowToUser } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersAPIContainer extends React.Component{
   

    componentDidMount(){
        
        this.props.getUsersThunkCreator(this.props.pageSize,this.props.currentPage);
       
            // this.props.toggleIsFetching(true);
            // getUsers(this.props.pageSize,this.props.currentPage)
            // .then(data=>{
            //     this.props.toggleIsFetching(false);
            //     this.props.setUsers(data.items);
            //     this.props.totalUserCount(data.totalCount);
            // });

    
}

    users = () =>{
        let user = this.props.users.map(u =>{
            return(
               
                
                <div key={u.id} className={s.userContainer}>
                    <div>
                    <NavLink to={'/profile/'+u.id} >
                        <img src={u.photos.small != null ? u.photos.small : userImg  } className={s.AvatarPhoto} />
                    </NavLink>
                        </div>
                    <div className={s.userInformation}>
                    <div className={s.NameLocation}>
                    <div>
                    <NavLink to={'/profile/'+u.id} >
                        {u.name}
                        </NavLink>
                        </div>
                    <div>
                    <div>{'u.location.city'}</div>
                    <div>{'u.location.country'}</div>
                    </div>
                    </div>
                    <div className={s.SubscribeAndStatus}>
                    <div>{u.status}</div>
                    {u.followed 
                        ? <button disabled={this.props.followingInProgress.some( id => id ===u.id)} onClick={()=>{
                           
                            this.props.unfollowThunkCreator(u.id);
                        
                        }}>Отписаться</button>
                        : <button disabled={this.props.followingInProgress.some( id => id ===u.id)} onClick={()=>{
                          
                            this.props.followThunkCreator(u.id);
                    }
                }>Подписаться</button>
                    }
                    </div>
                    </div>
                    
                </div>
               
                
            )
        });
        return user;
    }

    changePage = (newPage) =>{
        this.props.getUsersThunkCreator(this.props.pageSize,newPage);

    //     this.props.toggleIsFetching(true);
    // this.props.updateCurrentPage(newPage);

    //         getUsers(this.props.pageSize,newPage)
    //         .then(data=>{
    //             this.props.toggleIsFetching(false);
    //             this.props.setUsers(data.items);
               
    //         });

    }
    
    
    render() {
        
       return <>
       {this.props.isFetching ? <Preloader /> : null}
        <Users
            totalCount={this.props.totalCount}
            pageSize={this.props.pageSize}
            changePage={this.changePage}
            currentPage={this.props.currentPage}
            users={this.users}
            portionSize={this.props.portionSize}
       />
       </>
    }
}


let mapStateToProps = (state) =>{
    return{
        users: state.UsersPage.users,
        pageSize:state.UsersPage.pageSize,
        portionSize:state.UsersPage.portionSize,
        totalCount:state.UsersPage.totalCount,
        currentPage:state.UsersPage.currentPage,
        isFetching:state.UsersPage.isFetching,
        followingInProgress:state.UsersPage.followingInProgress,
        isAuth: state.auth.isAuth,
    }
}

// let mapDispatchToProps = (dispatch)=>{
//     return{
//         follow:(id)=>{
//             dispatch(followActionCreator(id));
//         },
//         unfollow:(id)=>{
//             dispatch(unfollowActionCreator(id));
//         },
//         setUsers:(users)=>{
//             dispatch(setUsersAC(users));
//         },
//         updateCurrentPage:(page)=>{
//             dispatch(currentPageActionCreator(page));
//         },
//         totalUserCount:(count)=>{
//             dispatch(totalUserCountActionCreator(count));
//         },
//         toggleIsFetching:(isFetching)=>{
//             dispatch(toggleIsFetchingAC(isFetching));
//         }

//     }
// }



export default compose(
    connect(mapStateToProps,{
        follow,
        unfollow,
        setUsers,
        updateCurrentPage,
        totalUserCount,
        toggleIsFetching,
        FollowingInProgress,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator
        }),
    withAuthRedirect
)(UsersAPIContainer);