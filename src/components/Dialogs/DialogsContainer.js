import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageActionCreator, changeMessageTextActionCreator } from '../../redux/dialog-reducer';

import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

//const DialogsContainer = () => {


    



//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let state = store.getState().DialogPage;

//                     const sendNewMessage = () => {
//                         store.dispatch(sendMessageActionCreator());
//                     }

//                     const changeMessageText = (text) => {
//                         store.dispatch(changeMessageTextActionCreator(text));
//                     }

//                     return <Dialogs
//                         DialogData={state.dialogs}
//                         messageData={state.messages}
//                         oldMessageText={state.newMessage}
//                         sendMessage={sendNewMessage}
//                         updateMessageText={changeMessageText}
//                     />
//                 }
//             }

//         </StoreContext.Consumer>
//     );
// }

let mapStateToProps = (state) =>{
    return {
        DialogData: state.DialogPage.dialogs,
        messageData: state.DialogPage.messages,
        oldMessageText:state.DialogPage.newMessage,
        isAuth: state.auth.isAuth,
    }
}

let mapDispatchToProps = (dispatch) =>{
    return {
        sendMessage: (text)=>{
            dispatch(sendMessageActionCreator(text));
        },
        // updateMessageText: (text) =>{
        //     dispatch(changeMessageTextActionCreator(text));
        // }

    }
}





export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);