import React from 'react';

function NavIcon ({titleIcon, iconStyle, NavTabText, NavTabStyle, href}) {
    
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
        <div>
            <li style={iconStyle}>
                <p style={NavTabStyle}>
                    <a style={NavTabText} className="NavTab__button-text" href={href} >{titleIcon}</a>
                </p>
            </li>
        </div>
    );
}

export default NavIcon;