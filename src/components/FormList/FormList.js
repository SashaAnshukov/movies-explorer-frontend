import React from 'react';
import logo from '../../images/logo.svg';

function Formlist ({title, name, onSubmit, buttonText, children}) {
    
    return (
        <div className="FormList__container">
            <div className="FormList__logo">
                <img  src={logo} alt="логотип Улыбка"/>
            </div>
            <h2 className="Formlist__title">{title}</h2>

            <form name={name} onSubmit={onSubmit}>
                <div className="FormList__form">
                {children}
                </div>
                <button type ="submit" aria-label="saveButton"
                    className="FormList__button FormList__button_invalid">{buttonText}
                </button>
            </form>
        </div>
    )
}

export default Formlist;