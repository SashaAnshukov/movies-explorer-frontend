import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import FormList from '../FormList/FormList';
import FormComponent from '../FormComponent/FormComponent';
import {useFormWithValidation} from "../../hooks/useForm"

function Register ({registration}) {
    
    // Стейт, в котором содержится значение инпута - name, mail, password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Обработчики изменения инпута обновляют стейт

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

//Отправляем данные на сервер
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        
        // Передаём значения управляемых компонентов во внешний обработчик
        const datastartPage = {};
        datastartPage.name = name;
        datastartPage.email = email;
        datastartPage.password = password;
        registration(datastartPage);
    }

    /*{Object.keys(errors).map((errorKey, index) => (
        <p className="Profile__input-error" key={index}>{errors[errorKey]}</p>
    ))}*/

    //const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    return (
        <div>
            
            <FormList
                title = {'Добро пожаловать!'} name={'Регистрация'} 
                onSubmit={handleSubmit} buttonText = {'Зарегистрироваться'}
            >
                <FormComponent name = {'Имя'} value = {name} onChange = {handleChangeName}
                    minLength = {'1'} maxLength = {'30'} required type = {'text'} nameInput ={'name'}
                />
                    
                
                <FormComponent name = {'E-mail'} value = {email} onChange = {handleChangeEmail}
                    minLength = {'1'} maxLength = {'30'} required type = {'text'} nameInput ={'Email'}
                />
                
                <FormComponent name = {'Пароль'} value = {password} onChange = {handleChangePassword}
                    minLength = {'4'}  required type = {'password'} nameInput ={'password'}
                />
                    
            </FormList>
            <p className="FormList__button_span">Уже зарегистрированы?
                <Link className="FormList__button_link" to='/signin'> Войти</Link>
            </p>
        </div>
    )
}

export default Register;