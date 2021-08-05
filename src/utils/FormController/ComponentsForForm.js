import React from 'react';
import s from './ComponentsForForm.module.css';

export const Textarea = ({input,meta,...props}) =>{
    const hasErrors = meta.touched && meta.error; 

    return(
        <div >
            <div >
            <textarea {...input} {...props} className={(hasErrors ? s.TextareaValidate : '') } />
            </div>
            <div >
            {hasErrors && <span className={(hasErrors ? s.messageValidate : '') } >{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input = ({input,meta,...props}) =>{
    const hasErrors = meta.touched && meta.error; 

    return(
        <div >
            <div >
            <input {...input} {...props} className={(hasErrors ? s.TextareaValidate : '') } />
            </div>
            <div >
            {hasErrors && <span className={(hasErrors ? s.messageValidate : '') } >{meta.error}</span>}
            </div>
        </div>
    )
}