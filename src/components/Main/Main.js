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
                <AboutProject />
                <Techs />
                
                <Portfolio />
            </div>
        </main>
    )
}

export default Main;