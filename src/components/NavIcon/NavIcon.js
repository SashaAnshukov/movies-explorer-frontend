import React from 'react';
import {Link} from 'react-scroll'

function NavIcon ({titleIcon, iconStyle, textStyle, navTabStyle, to}) {
    
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
                    <Link 
                        className={textStyle} 
                        to={to}
                        smooth={true}
                        duration={1000}
                    >
                        {titleIcon}
                    </Link>
                </p>
            </button>
        </>
    );
}

export default NavIcon;