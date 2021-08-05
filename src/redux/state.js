import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
     _state:{
        DialogPage: {
            dialogs: [
                { name: 'Кирилл', id: 1 },
                { name: 'Коля', id: 2 },
                { name: 'Антон', id: 3 },
                { name: 'Динар', id: 4 },
            ],
            messages: [
                { id: 1, message: 'Привет' },
                { id: 2, message: 'Салага' },
                { id: 3, message: 'Как жизнь' },
                { id: 4, message: '?' },
            ],
            newMessage: '',
        },
        ProfilePage: {
            posts: [
                { id: 1, message: 'Это мой второй пост', likesCount: 15 },
                { id: 2, message: 'Мама, я в Дубае!', likesCount: 4 },
                { id: 3, message: 'Мама, я Шейх', likesCount: 11 }
            ],
            newPostText:'',
        },
        sidebar:{},
    },
    getState(){
        return this._state;
    },
    _rerenderDom(){
        console.log('State изменен');
    },
    subscribe(observer){
        this._rerenderDom = observer;
    },
    dispatch(action){
        this._state.ProfilePage = profileReducer(this._state.ProfilePage,action);
        this._state.DialogPage = dialogReducer(this._state.DialogPage,action);
        this._state.sidebar = sidebarReducer(this._state.sidebar,action);
        //debugger;
        this._rerenderDom(this._state);
    },
}


export default store;