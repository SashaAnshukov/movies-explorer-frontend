import logo from '../../images/logo.svg';

function Header({children}) {

    return (
        <div className="App__container">
            <div className="header">
                <img className="header__logo" src={logo} alt="логотип Улыбка"/>
                {children}
            </div>
        </div>
    );
}

export default Header;