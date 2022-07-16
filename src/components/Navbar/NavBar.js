import { Link, useLocation } from 'react-router-dom';


function NavBar({ loggedIn}) {
  const {pathname} = useLocation();

  const textBarRegistration = pathname === `${"/sign-up"}` ? "Регистрация" : "Регистрация";
  const textBarAuthorization = pathname === `${"/sign-in"}` ? "Войти" : "Войти";
  const textBarMovies = pathname === `${"/movies"}` ? "Фильмы" : "Фильмы";
  const textBarSavedMovies = pathname === `${"/saved-movies"}` ? "Сохранённые фильмы" : "Сохранённые фильмы";
  const textBarProfile = pathname === `${"/profile"}` ? "Аккаунт": "Аккаунт";

  const linkRouteRegistration = `${pathname === "/sign-up" ? "/" : "/"}`;
  const linkRouteAuthorization = `${pathname === "/sign-in" ? "/" : "/"}`;
  const linkRouteMovies = `${pathname === "/movies" ? "/main" : "/main"}`;
  const linkRouteSavedMovies = `${pathname === "/sign-in" ? "/main" : "/main"}`;
  const linkRouteProfile = `${pathname === "/sign-in" ? "/main" : "/main"}`;

  
  
  return (
    <nav className="NavBar__container">
      {loggedIn ?
        (<>
          <div className="NavBar__link_movies opacity">
            <Link to='/movies' className="NavBar__link_movies opacity">{textBarMovies}</Link>
            <Link to='/saved-movies'className="NavBar__link_movies opacity">{textBarSavedMovies}</Link>
          </div>
          <Link to='/profile' className="NavBar__link_profile">{textBarProfile}</Link>

          <div className="hamburger-menu">
          
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
              <span></span>
            </label>
            <div className="menu__overlay"></div>
            <ul className="menu__box">
              <div className="popup__overlay"></div>
              <Link to ="/" className="menu__item"> Главная </Link>
              <Link to ="/movies" className="menu__item"> Фильмы </Link>
              <Link to ="/saved-movies" className="menu__item"> Сохранённые фильмы </Link>
              <Link to ="/profile" className="menu__item-account"> Аккаунт </Link>
            </ul>
          </div>

        </>)
      :
        (<>
          <Link to='/sign-up' onClick= {linkRouteRegistration} className="NavBar__link_startScreen">{textBarRegistration}</Link>
          <Link to='/sign-in' onClick= {linkRouteAuthorization} className="NavBar__link_startScreen">{textBarAuthorization}</Link>
        </>)
      }
    </nav>
  );
}

export default NavBar;