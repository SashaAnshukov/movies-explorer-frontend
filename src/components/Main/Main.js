import React from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main() {
    return (
        <main>
            <div className="App">
                <Promo>
                    <NavTab />
                </Promo>
                <iframe 
                    width="480" height="270"
                    src="https://dzen.ru/embed/v7jP5tBWeXnA?from_block=partner&from=zen&mute=0&autoplay=0&tv=0"
                    allow="autoplay;
                    fullscreen; 
                    accelerometer;
                    gyroscope;
                    picture-in-picture; 
                    encrypted-media"
                    frameborder="0"
                    scrolling="no" 
                    allowfullscreen>
                </iframe>
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </div>
        </main>
    )
}

export default Main;
