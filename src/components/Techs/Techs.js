import React from 'react';
import MainStack from '../MainStack/MainStack';
import NavIcon from '../NavIcon/NavIcon';

function Techs () {

    const titleIcon = {
        id1: 'HTML',
        id2: 'CSS',
        id3: 'JS',
        id4: 'React',
        id5: 'Git',
        id6: 'Express.js',
        id7: 'mongoDB'
    }
    
    const styles = {
        display: 'flex',
        width: 270,
        height: 60,
        width: 10,
        border: 'none',
        padding: 0
    }

    /*const mainStackStyle = {
        background: '#F5F5F5',
        maxWidth: 1140,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column'
    }*/

    const Techs__elements = {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 90px)',
        justifyContent: 'center',
        columnGap: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 100
    }

    const NavTab__buttonText ={
        color: '#000000',
        fontStyle: 'normal',
        display: 'flex',
        minWidth: 96, 
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: '-0.04em'
    }

    const Techs__navTabStyle = {
        display: 'flex',
        justifyContent: 'center',
        width: 96,
        height: 60,
        borderRadius: 10,
        margin: 0,
        backgroundColor: '#E8E8E8',
        border: 'none'
    }

    return (
        <div className="Techs">
            <MainStack stackName = {'Технологии'}>
                <h1 className="Promo__title">7 технологий</h1>
                <p className="Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <section style= {Techs__elements}>
                    <NavIcon 
                        titleIcon = {titleIcon.id1} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />
                    <NavIcon 
                        titleIcon = {titleIcon.id2} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />
                    <NavIcon 
                        titleIcon = {titleIcon.id3} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />
                    <NavIcon 
                        titleIcon = {titleIcon.id4} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />
                    <NavIcon 
                        titleIcon = {titleIcon.id5} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />
                    <NavIcon 
                        titleIcon = {titleIcon.id6} 
                        iconStyle = {styles} NavTabText = {NavTab__buttonText}
                        NavTabStyle = {Techs__navTabStyle} 
                    />      
                </section>

            </MainStack>
        </div>
    );
}

export default Techs;