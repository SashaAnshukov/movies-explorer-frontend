import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Profile ({authorization, signOut}) {
    // Стейт, в котором содержится значение инпута - name, mail
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Обработчики изменения инпута обновляют стейт

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    //Отправляем данные на сервер
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
       // authorization({ name, email });
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
                <h2 className="Profile__title">Привет, Виталий!</h2>

                <form name ={'Аккаунт'} onSubmit={handleSubmit}>
                    <div className="FormList__form">
                        <div className="Profile__label">
                            <h2 className="Profile__input_name"> Имя
                            <input
                                value={name || ''} onChange={handleChangeName}
                                required minLength="1" maxLength="30" type="text"
                                name ="Name" placeholder = "Имя"
                                className="Profile__input Profile__input_text_namePlace"
                            />
                            </h2>
                            <span className="FormComponent__input-error"></span>
                        </div>
                        
                        <div className="Profile__label">
                            <h2 className="Profile__input_name"> E-mail
                            <input
                                value={email || ''} onChange={handleChangeEmail}
                                required minLength="1" maxLength="50" type="text"
                                name ="Email" placeholder = "E-mail"
                                className="Profile__input Profile__input_text_namePlace"
                            />
                            </h2>
                            <span className="FormComponent__input-error"></span>
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