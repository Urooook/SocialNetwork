const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

let initialState = {
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
}

const dialogReducer = (state=initialState,action) => {

    switch(action.type){
        case SEND_MESSAGE:{
            return{
                ...state,
                messages : [...state.messages,{
                    id:5,
                    message:action.newMessage
                 }],
                //  newMessage:'',
            }
            }
        // case UPDATE_MESSAGE_TEXT:{
        //     return{
        //         ...state,
        //         newMessage:action.messageText
        //     }
        // }
        default:
            return state;

    }
}


export const sendMessageActionCreator = (text) =>{
    return {
        type:SEND_MESSAGE,
        newMessage:text
    }
}

// export const changeMessageTextActionCreator = text =>{
//     return {
//         type:UPDATE_MESSAGE_TEXT,
//         messageText:text,
//     }
// }

export default dialogReducer;