import React from 'react';
import MainStack from '../MainStack/MainStack';

function Portfolio () {

    const text = {
        name: 'Александр',
        profession: 'Фронтенд-разработчик, 37 лет',
        about: 'Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.',
        link1: '',
        link2: 'https://github.com/SashaAnshukov',
        titleItem: 'Портфолио',
        item1: 'Статичный сайт',
        linkStatic: 'https://github.com/SashaAnshukov/how-to-learn/blob/main/index.html',
        item2: 'Адаптивный сайт',
        linkAdaptive: 'https://sashaanshukov.github.io/russian-travel3/#',
        item3: 'Одностраничное приложение',
        linkSinglePageApp: 'https://sashaanshukov.github.io/mesto/'
    }
    
    return (
        <div>
            <MainStack stackName = {'Студент'} id ='Студент'>
            <section className="portfolio">
                    <div className="portfolio__space">
                        <div className="portfolio__info">
                            <h1 className="portfolio__title">{text.name}</h1>
                            <p className="portfolio__subtitle">{text.profession}</p>
                            <p className="portfolio__about">{text.about}</p>
                            <div className="portfolio__description">
                                <a
                                    className="portfolio__link" 
                                    href="https://github.com/SashaAnshukov">
                                    {text.link1}
                                    Facebook
                                </a>
                                <a
                                    className="portfolio__link"
                                    href={text.link2}>
                                    Github
                                </a>
                            </div>
                            <p className="portfolio__title-item">{text.titleItem}</p>
                            <div className="portfolio__item">
                                <a className="portfolio__item-web">{text.item1}</a>
                                <a href = {text.linkStatic} className="portfolio__item-web">↗</a>
                            </div>
                            <div className="portfolio__item">
                                <a className="portfolio__item-web">{text.item2}</a>
                                <a href = {text.linkAdaptive} className="portfolio__item-web">↗</a>
                            </div>
                            <div className="portfolio__item">
                                <a className="portfolio__item-web">{text.item3}</a>
                                <a href = {text.linkSinglePageApp} className="portfolio__item-web">↗</a>
                            </div>
                            <div className = "portfolio__holder">
                            <div className = "portfolio__round">
                                <img className="portfolio__avatar" src="https://bugaga.ru/uploads/posts/2019-05/1557921502_pop-personazhi-19.jpg" alt="Аватар пользователя"/>
                            </div> 
                        </div>
                        </div>
                        
                    </div>
                </section>
            </MainStack>
        </div>
    );
}

export default Portfolio;