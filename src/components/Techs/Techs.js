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

    return (
        <div className="Techs">
            <MainStack stackName = {'Технологии'}>
                <h1 className = "Techs__title">7 технологий</h1>
                <p className = "Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <section className = {'Techs__elements'}>
                    <NavIcon 
                        to={''}
                        titleIcon = {titleIcon.id1} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon
                        to={''}
                        titleIcon = {titleIcon.id2} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon
                        to={''}  
                        titleIcon = {titleIcon.id3} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        to={''}
                        titleIcon = {titleIcon.id4} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'}

                    />
                    <NavIcon 
                        to={''} 
                        titleIcon = {titleIcon.id5} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        to={''} 
                        titleIcon = {titleIcon.id6} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        to={''} 
                        titleIcon = {titleIcon.id7} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />      
                </section>

            </MainStack>
        </div>
    );
}

export default Techs;