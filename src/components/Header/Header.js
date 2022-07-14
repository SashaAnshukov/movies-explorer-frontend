import logo from '../../images/logo.svg';
import { Link, useLocation } from "react-router-dom";

function Header({children}) {

    const {pathname} = useLocation();

    return (
        <>
        { 
            pathname !== "/sign-up" 
            &&
            pathname !== "/sign-in"
            &&
            pathname !== "/404"
            ?
            (<div className="App__container">
                <div className="header">
                    <Link to ="/">
                        <img className="header__logo" src={logo} alt="логотип Улыбка"/>
                    </Link>
                    {children}
                </div>
            </div>)
            :
            null
        }
        </>
    );
}

export default Header;