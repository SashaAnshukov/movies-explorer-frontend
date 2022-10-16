import { Link, useLocation } from 'react-router-dom';


function NavBar({ loggedIn}) {
  const {pathname} = useLocation();

  const textBarRegistration = pathname === `${"/signup"}` ? "Регистрация" : "Регистрация";
  const textBarAuthorization = pathname === `${"/signin"}` ? "Войти" : "Войти";
  const textBarMovies = pathname === `${"/movies"}` ? "Фильмы" : "Фильмы";
  const textBarSavedMovies = pathname === `${"/saved-movies"}` ? "Сохранённые фильмы" : "Сохранённые фильмы";
  const textBarProfile = pathname === `${"/profile"}` ? "Аккаунт": "Аккаунт";

  const linkRouteRegistration = `${pathname === "/signup" ? "/" : "/"}`;
  const linkRouteAuthorization = `${pathname === "/signin" ? "/" : "/"}`;
  const linkRouteMovies = `${pathname === "/movies" ? "/main" : "/main"}`;
  const linkRouteSavedMovies = `${pathname === "/signin" ? "/main" : "/main"}`;
  const linkRouteProfile = `${pathname === "/signin" ? "/main" : "/main"}`;

  
  
  return (
    <nav className="NavBar__container">
      {loggedIn ?
        (<>
          <div className="NavBar__link_movies">
            <Link to='/movies' className="NavBar__link_movies_text opacity">{textBarMovies}</Link>
            <Link to='/saved-movies'className="NavBar__link_movies_text opacity">{textBarSavedMovies}</Link>
          </div>
          <Link to='/profile' className="NavBar__link_profile">{textBarProfile}</Link>

          <div className="hamburger-menu">
          
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
              <span></span>
            </label>
            <div className="menu__overlay"></div>
            <ul className="menu__box">
              
              <Link to ="/" className="menu__item"> Главная </Link>
              <Link to ="/movies" className="menu__item"> Фильмы </Link>
              <Link to ="/saved-movies" className="menu__item"> Сохранённые фильмы </Link>
              <Link to ="/profile" className="menu__item-account"> Аккаунт </Link>
            </ul>
          </div>

        </>)
      :
        (<>
          <Link to='/signup' onClick= {linkRouteRegistration} className="NavBar__link_startScreen">{textBarRegistration}</Link>
          <Link to='/signin' onClick= {linkRouteAuthorization} className="NavBar__link_startScreen">{textBarAuthorization}</Link>
        </>)
      }
    </nav>
  );
}

export default NavBar;