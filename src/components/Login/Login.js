import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../../utils/FormController/ComponentsForForm';
import { required } from '../../utils/FormController/FormContriller';
import { LoginThunkCreator } from '../../redux/auth-reducer';
import { Redirect } from 'react-router';
import s from '../../utils/FormController/ComponentsForForm.module.css';

const LoginForm = (props) =>{
    //debugger
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'login'} name={'login'} component={Input} validate={[required]} />
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} component={Input} validate={[required]} />
            </div>
            <div>
                <label>
                <Field name={'rememberMe'} type={'checkbox'} component={'input'} /> rememder me
                </label>
            </div>
            {props.captcha && <img src={props.captcha} />}
            {props.captcha &&  <div>
                <Field placeholder={'Введите символы из капчи'} name={'captcha'} component={Input} validate={[required]} />
            </div>}
            <div className={s.messageValidate}>{props.error}</div>
            <button>Enter</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login = (props) =>{
    const onSubmit = formData =>{
       props.LoginThunkCreator(formData.login,formData.password,formData.rememberMe,formData.captcha);
    }

    if(props.isAuth){
        return <Redirect to={'/profile'} />
    }

    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm captcha={props.captcha} onSubmit={onSubmit} />
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        captcha:state.auth.captcha,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,{LoginThunkCreator})(Login);