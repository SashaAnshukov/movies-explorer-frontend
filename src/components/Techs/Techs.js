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

    const href = {
        id1: 'https://developer.mozilla.org/ru/docs/Web/HTML',
        id2: 'https://developer.mozilla.org/ru/docs/Web/CSS',
        id3: 'https://developer.mozilla.org/ru/docs/Web/JavaScript',
        id4: 'https://reactjs.org/docs/getting-started.html',
        id5: 'https://old.calculate-linux.org/main/ru/git',
        id6: 'https://expressjs.com/ru/',
        id7: 'https://mongodb.com/'
    }

    return (
        <div className="Techs">
            <MainStack stackName = {'Технологии'}>
                <h1 className = "Techs__title">7 технологий</h1>
                <p className = "Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <section className = {'Techs__elements'}>
                    <NavIcon 
                        href={href.id1}
                        titleIcon = {titleIcon.id1} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon
                        href={href.id2}
                        titleIcon = {titleIcon.id2} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon
                        href={href.id3}  
                        titleIcon = {titleIcon.id3} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        href={href.id4}
                        titleIcon = {titleIcon.id4} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'}

                    />
                    <NavIcon 
                        href={href.id5} 
                        titleIcon = {titleIcon.id5} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        href={href.id6} 
                        titleIcon = {titleIcon.id6} 
                        iconStyle = {'Techs__icon'} textStyle = {'Techs__iconText'}
                        navTabStyle = {'Techs__navTab'} 
                    />
                    <NavIcon 
                        href={href.id7} 
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