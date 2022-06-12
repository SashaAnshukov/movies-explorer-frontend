function Footer() {
    return (
        <div className="App__container">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer">
                <p className="footer__copyright">&copy; 2022</p>
                <nav className="footer__links">
                    <ul className="footer__links-list">
                        <li className="footer__link-list-type">
                            <a 
                                className="footer__link opacity"
                                href="https://practicum.yandex.ru/profile/web/"
                                target="_blank">Яндекс.Практикум
                            </a>
                        </li>
                        <li className="footer__link-list-type">
                            <a 
                                className="footer__link opacity"
                                href="https://github.com/SashaAnshukov"
                                target="_blank">Github
                            </a>
                        </li>
                        <li className="footer__link-list-type">
                            <a className="footer__link opacity"
                            href="https://www.facebook.com"
                            target="_blank">Facebook
                            </a>
                        </li>
                        <p><a name="top"></a></p>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Footer;