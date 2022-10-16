import React from 'react';
import NavIcon from '../NavIcon/NavIcon';


function NavTab () {

    const titleIcon = {
        id1: 'О проекте',
        id2: 'Технологии',
        id3: 'Студент'
    }

    return (
        <section className="NavTab">
            <section className= 'NavTab__elements'>
                    <NavIcon
                        to={"MainStack__title"}
                        titleIcon={titleIcon.id1}
                        iconStyle={'NavTab__icon'}
                        textStyle ={'NavTab__buttonText'}
                        navTabStyle={'NavTab__techs'} 
                    />
                    <NavIcon 
                        to={"Techs"}
                        titleIcon = {titleIcon.id2}
                        iconStyle = {'NavTab__icon'} textStyle = {'NavTab__buttonText'}
                        navTabStyle = {'NavTab__techs'}
                        className = "opacity"
                    /> 
                    <NavIcon 
                        to={"student"}
                        titleIcon = {titleIcon.id3}
                        iconStyle = {'NavTab__icon'} textStyle = {'NavTab__buttonText'}
                        navTabStyle = {'NavTab__techs'} 
                    />      
                </section>
                
        </section>
    );
}

export default NavTab;