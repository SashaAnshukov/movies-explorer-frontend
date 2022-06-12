import React from 'react';

function MainStack({title, stackName, children, id}) {

    return (
        <section className='MainStack' id = {id}>
            <h1 className="MainStack__title">{stackName}</h1>
            <h1 className="Promo__title">{title}</h1>
            {children}
        </section>
    )
}

export default MainStack;