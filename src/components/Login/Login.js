import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import FormList from '../FormList/FormList';
import FormComponent from '../FormComponent/FormComponent';

function Login ({authorization}) {
    // Стейт, в котором содержится значение инпута - mail, password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Обработчики изменения инпута обновляют стейт

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
        authorization({ email, password });

    }

    //очищаем инпуты при каждом открытии модального окна
    /*useEffect(() => {
        if (isOpen) {
            setMail('');
            setPassword('')
        }
    }, [isOpen])*/

    return (
        <div>
            <FormList
                title = {'Рады видеть!'} onSubmit={handleSubmit}
                name={'Вход'}  buttonText = {'Войти'}
            >
                <FormComponent name = {'E-mail'} value = {email} onChange = {handleChangeEmail}
                    minLength = {'1'} maxLength = {'30'} required type = {'text'} nameInput ={'Email'}
                />
                <FormComponent name = {'Пароль'} value = {password} onChange = {handleChangePassword}
                    minLength = {'4'}  required type = {'password'} nameInput ={'password'}
                />
            </FormList>
            <p className="FormList__button_span">Ещё не зарегистрированы?
                <Link className="FormList__button_link" to='/signup'> Регистрация</Link>
            </p>
        </div>
    )

}

export default Login;