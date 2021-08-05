import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, updatePostTextActionCreator } from '../../../redux/profile-reducer';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../utils/FormController/ComponentsForForm';
import { maxLength, required } from '../../../utils/FormController/FormContriller';




const MyPosts = React.memo( (props) => {
    console.log('Render');
   

    let postElement = props.posts.map( (post,i) => <Post key={i} message={post.message} LikeCount={post.likesCount} />  )


    const createPost = (values) => {
        
        //let text = newPostElement.current.value;
        props.addPost(values.addPostTextarea)
       // props.newPostText('');
       // console.log(props.posts);
    }

   

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <AddPostFormRedux onSubmit={createPost} />
            <div className={s.posts}>
                { postElement }
            </div>
        </div>

    );
});


const maxLength15 = maxLength(15);
const AddPostForm = (props) =>{
    
    
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'addPostTextarea'} component={Textarea} validate={[required,maxLength15]}   />
            </div>
            <div><button>Опубликовать</button></div>
        </form>
    )
}
const AddPostFormRedux = reduxForm({form:"addPostForm"})(AddPostForm);

export default MyPosts;