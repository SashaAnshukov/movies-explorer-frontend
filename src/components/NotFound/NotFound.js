import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function NotFound () {
    //const history = useHistory();

    return (
        <div className="NotFound">
            <h1 className="NotFound__title">404</h1>
            <h2 className="NotFound__description">Страница не найдена</h2>
            <Link className="NotFound__link" to='/'> Назад</Link>
        </div>
    )

}

export default NotFound;