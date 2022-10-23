import React from 'react';
import {Link} from 'react-scroll'

function NavIcon ({titleIcon, iconStyle, textStyle, navTabStyle, href, to}) {

    return (
        <>
            <button className={iconStyle} type="button">
                <p className={navTabStyle}>
                    <Link 
                        className={textStyle} 
                        to={to}
                        href={href}
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