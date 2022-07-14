import React from 'react';

function NavIcon ({titleIcon, iconStyle, textStyle, navTabStyle, href}) {
    
    /*const anchors = document.querySelectorAll('[href]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const blocId = anchor.getAttribute('href')
            document.querySelector('' + blocId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }*/

    return (
        <>
            <button className={iconStyle} type="button">
                <p className={navTabStyle}>
                    <a className={textStyle} href={href} >{titleIcon}</a>
                </p>
            </button>
        </>
    );
}

export default NavIcon;