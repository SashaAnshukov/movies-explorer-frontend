import React from 'react';


function FormComponent ({name, value, onChange, minLength, maxLength, type, nameInput}) {

    return (
        <div className="FormComponent__label">
            <h2 className='FormComponent__name'>{name}</h2>
            <input
                value={`${value}` || ''} onChange={onChange}
                required minLength={minLength} maxLength={maxLength} type={type}
                name ={nameInput}
                className="FormComponent__input FormComponent__input_text_namePlace"
            />
            <span className="FormComponent__input-error"></span>
        </div>
    )
}

export default FormComponent;