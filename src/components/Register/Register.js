import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import FormList from '../FormList/FormList';
import FormComponent from '../FormComponent/FormComponent';
import {useFormWithValidation} from "../../hooks/useForm"

function Register ({registration}) {

    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    //Отправляем данные на сервер
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        registration( values.name, values.email, values.password );
        //resetForm();
    }

    return (
        <div>
            
            <FormList
                title = {'Добро пожаловать!'} name={'Регистрация'} 
                onSubmit={handleSubmit} buttonText = {'Зарегистрироваться'}
            >
                <FormComponent name = {'Имя'} value = {values.name || ''} onChange = {handleChange}
                    minLength = {'1'} maxLength = {'30'} required type = {'text'} nameInput ={'name'}
                />
                <p className="Formlist__input-error">{errors.name}</p>    
                
                <FormComponent name = {'E-mail'} value = {values.email || ''} onChange = {handleChange}
                    minLength = {'1'} maxLength = {'30'} required type = {'email'} nameInput ={'email'}
                />
                <p className="Formlist__input-error">{errors.email}</p>
                
                <FormComponent name = {'Пароль'} value = {values.password || ''} onChange = {handleChange}
                    minLength = {'4'}  required type = {'password'} nameInput ={'password'}
                />
                <p className="Formlist__input-error">{errors.password}</p>    

            </FormList>
            <p className="FormList__button_span">Уже зарегистрированы?
                <Link className="FormList__button_link" to='/signin'> Войти</Link>
            </p>
        </div>
    )
}

export default Register;