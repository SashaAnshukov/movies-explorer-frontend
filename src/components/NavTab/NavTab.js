import React from 'react';
import NavIcon from '../NavIcon/NavIcon';

function NavTab () {

    const titleIcon = {
        id1: 'О проекте',
        id2: 'Технологии',
        id3: 'Студент'
    }
    
    const styles = {
        display: 'flex',
        width: 270,
        height: 36,
        width: 10,
    }

    const Techs__elements = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 90px)',
        columnGap: 10,
        marginTop: 151,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 22
    }

    const NavTab__buttonText ={
        color: '#000000',
        fontStyle: 'normal',
        display: 'flex',
        minWidth: 96, 
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 16,
    }

    const Techs__navTabStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: 96,
        height: 36,
        borderRadius: 10,
        margin: 0,
        backgroundColor: '#E8E8E8',
        border: 'none'
    }

    return (
        <section className="NavTab">
            <section style= {Techs__elements}>
                    <NavIcon href="#О_проекте" titleIcon = {titleIcon.id1} iconStyle = {styles} NavTabText = {NavTab__buttonText} NavTabStyle = {Techs__navTabStyle} />
                    <NavIcon href="#Технологии" titleIcon = {titleIcon.id2} iconStyle = {styles} NavTabText = {NavTab__buttonText} NavTabStyle = {Techs__navTabStyle} /> 
                    <NavIcon href="#Студент" titleIcon = {titleIcon.id3} iconStyle = {styles} NavTabText = {NavTab__buttonText} NavTabStyle = {Techs__navTabStyle} />      
                </section>
                
        </section>
    );
}

export default NavTab;