import React from 'react';
import MyPosts from './MyPosts';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profile-reducer';

import { connect } from 'react-redux';



// const MyPostsContainer = (props) => {


//     return (
//         <StoreContext.Consumer>
//             {
//                 (store)=>{

//                     let state = store.getState();

//                     const createPost = () => {
//                         //let text = newPostElement.current.value;
//                         store.dispatch(addPostActionCreator());
//                        // props.newPostText('');
//                        // console.log(props.posts);
//                     }
                
//                     const onChangeText = (text) =>{
                       
//                         store.dispatch(updatePostTextActionCreator(text));
//                         //console.log(props);
//                     }

//                    return <MyPosts 
//posts={state.ProfilePage.posts} 
//addPost={createPost}
 //updateText={onChangeText}
//                         oldPostText={state.ProfilePage.newPostText}
//                     />

//                 }
//             }
            
//         </StoreContext.Consumer>

//     );
// }

let mapStateToProps = (state) =>{
    return {
        posts:state.ProfilePage.posts,
        oldPostText:state.ProfilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost:(text)=>{
            dispatch(addPostActionCreator(text));
        },
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);

export default MyPostsContainer;