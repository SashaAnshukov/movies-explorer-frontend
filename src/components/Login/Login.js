import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import FormList from '../FormList/FormList';
import FormComponent from '../FormComponent/FormComponent';
import {useFormWithValidation} from "../../hooks/useForm"

function Login ({authorization}) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    //Отправляем данные на сервер
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        authorization( values.email, values.password );
        
    }

    return (
        <div>
            <FormList
                title = {'Рады видеть!'} onSubmit={handleSubmit}
                name={'Вход'}  buttonText = {'Войти'}
            >
                <FormComponent name = {'E-mail'} value = {values.email || ''} onChange = {handleChange}
                    minLength = {'1'} maxLength = {'30'} required type = {'email'} nameInput ={'email'}
                />
                <p className="Formlist__input-error">{errors.email}</p>
                
                <FormComponent name = {'Пароль'} value = {values.password || ''} onChange = {handleChange}
                    minLength = {'4'}  required type = {'password'} nameInput ={'password'}
                />
                <p className="Formlist__input-error">{errors.password}</p>
            </FormList>
            <p className="FormList__button_span">Ещё не зарегистрированы?
                <Link className="FormList__button_link" to='/signup'> Регистрация</Link>
            </p>
        </div>
    )

}

export default Login;