import { useLocation } from "react-router-dom";
function Footer() {

    const {pathname} = useLocation();

    return (
        <>
        { 
            pathname !== "/sign-up" 
            &&
            pathname !== "/sign-in"
            &&
            pathname !== "/404"
            &&
            pathname !== "/profile"
            ?
            (<div className="App__container">
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
                            <a name="top"></a>
                        </ul>
                    </nav>
                </div>
            </div>)
            :
            null
        }
        </>
    );
}

export default Footer;