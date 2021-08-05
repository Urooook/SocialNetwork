import React from 'react';
import s from './Post.module.css';

const Post = props => {
    return (

        <div className={s.item}>
            <img className={s.PostImg} src="https://www.mirf.ru/wp-content/uploads/2020/09/1480331127-2048x1152.jpg" />
           {props.message}
            <div>
                <button>Like </button> <span>{props.LikeCount}</span>
            </div>
        </div>


    );
}

export default Post;
