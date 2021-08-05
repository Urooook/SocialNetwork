import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessageActionCreator,changeMessageTextActionCreator } from '../../redux/dialog-reducer';
import { Redirect } from 'react-router';
import { Field,reduxForm } from 'redux-form';
import { Textarea } from '../../utils/FormController/ComponentsForForm';
import { required,maxLength } from '../../utils/FormController/FormContriller';

const Dialogs = (props) => {


    let dialogElement = props.DialogData.map((dialog, i) => <DialogItem key={i} name={dialog.name} id={dialog.id} />);

    let messageElement = props.messageData.map((m, i) => <Message key={i} message={m.message} />);

    let newMassage = React.createRef();

    const sendNewMessage = (value) => {
        
        //let message = newMassage.current.value;
        //console.log(message);
        props.sendMessage(value.AddMessageTextarea);
    }

    // const changeMessageText = () => {
    //     let text = newMassage.current.value;
    //     props.updateMessageText(text);
    // }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>

                {dialogElement}

            </div>
            <div className={s.messages}>

                {messageElement}

                <AddMessageFormRedux onSubmit={sendNewMessage} />
            </div>
            
        </div>
    );
}
const maxLength25 = maxLength(25);
const AddMessageForm = (props) =>{
    
    return(
        <form onSubmit={props.handleSubmit}>
             <Field name={'AddMessageTextarea'} component={Textarea} validate={[required,maxLength25]} />
                <button>Отправить</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form:'AddMessageForm'})(AddMessageForm);


export default Dialogs;