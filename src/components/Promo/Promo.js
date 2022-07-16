import React from 'react';

function Promo({children}) {
    return (
        <section className="Promo">
            <h1 className="Promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            {children}
        </section>
    );
}

export default Promo;