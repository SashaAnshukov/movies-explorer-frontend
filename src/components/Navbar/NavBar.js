import { Link, useLocation } from 'react-router-dom';

function NavBar({ signIn}) {
  const {pathname} = useLocation();

  /*const textBar = pathname === `${"/sign-in"}` ? "Регистрация" : "Войти";
  const linkRoute = `${pathname === "/sign-in" ? "/main" : "/main"}`;*/
  
  return (
    <nav className="navBar__container">
      {loggedIn ?
        (<>
          <h2 className="navBar__link">Регистрация</h2>
          <Link to='' onClick= {signIn} className="navBar__link_signIn">Войти</Link>
        </>)
      : 
        (<>
          <Link to={linkRoute} className="navBar__link_out">{textBar}</Link>
        </>)
      }
    </nav>
  );
}

export default NavBar;