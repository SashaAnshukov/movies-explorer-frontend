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
          <Link to='/movies' className="NavBar__link_movies opacity">{textBarMovies}</Link>
          <Link to='/saved-movies' className="NavBar__link_movies opacity">{textBarSavedMovies}</Link>
          <Link to='/profile' className="NavBar__link_profile">{textBarProfile}</Link>
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