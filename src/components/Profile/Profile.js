import React from 'react';
import {useState, useEffect} from 'react';
import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Profile ({onUpdateUser, signOut}) {

    const currentUser = useContext(CurrentUserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({criteriaMode: "all"});
    
    // Стейт, в котором содержится значение инпута - name, mail
    const [name, setInputName] = useState('');
    const [email, setInputEmail] = useState('');

    // Обработчики изменения инпута обновляют стейт

    function handleChangeName(e) {
        setInputName(e.target.value);
    }

    function handleChangeEmail(e) {
        setInputEmail(e.target.value);
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setInputName(currentUser.name);
        setInputEmail(currentUser.email);
    }, [currentUser]);

    //Отправляем данные на сервер
    function onSubmit() {
        // Запрещаем браузеру переходить по адресу формы
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            email
        });
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
            <div className="FormList__container">
                <h2 className="Profile__title">Привет, {currentUser.name}!</h2>

                <form name ={'Аккаунт'} onSubmit={handleSubmit(onSubmit)}>
                    <div className="FormList__form">
                        <div className="Profile__label">
                            <h2 className="Profile__input_name"> Имя
                                <input
                                    placeholder = "Имя"
                                    {...register("Name", {
                                        required: "Это обязательное поле",
                                        minLength: {
                                            value: 2,
                                            message: "Имя должно быть не короче 2 символов"
                                        },
                                        maxLength: {
                                            value: 30,
                                            message: "Имя должно быть не более 30 символов"
                                        }
                                    })}
                                    value={name || ''}
                                    onChange={handleChangeName}
                                    type="text"
                                    className="Profile__input Profile__input_text_namePlace"
                                />
                                
                            </h2>
                            <ErrorMessage
                                errors={errors}
                                name="Name"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                    <p className="Profile__input-error" key={type}>{message}</p>
                                ))}
                            />
                        </div>
                        
                        <div className="Profile__label">
                            <h2 className="Profile__input_name"> E-mail
                            <input
                                placeholder = "E-mail"
                                {...register("Email", {
                                    required: "Это обязательное поле",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Не верный формат почты"
                                    }
                                })}
                                value={email || ''}
                                onChange={handleChangeEmail}
                                type="text"
                                className="Profile__input Profile__input_text_namePlace"
                            />
                            </h2>
                            <ErrorMessage
                                errors={errors}
                                name="Email"
                                render={({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                    <p className="Profile__input-error" key={type}>{message}</p>
                                ))}
                            />
                        </div>
                    </div>
                    
                    <div className="Profile__button">
                        <button className="Profile__button_item" type ="submit"
                            aria-label="saveButton">Редактировать
                        </button>
                    </div>
                </form>
                <button to='' className="Profile__button_item" onClick= {signOut}
                    aria-label="signOutButton">Выйти из аккаунта
                </button>
            </div>
        </div>

        
    )

}

export default Profile;