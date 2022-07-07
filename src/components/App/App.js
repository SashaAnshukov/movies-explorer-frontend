import './App.css';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Movies from '../Movies/Movies';
import NavBar from '../Navbar/NavBar';
import mainApi from "../../utils/MainApi";
import {useState, useEffect} from 'react';

function App() {
  const navigate = useNavigate();

  // стэйт пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedCards, setsavedCards] = useState([]);


  function registration() {
    navigate('/sign-in');
  }

  function authorization() {
    setLoggedIn(true);
    navigate('/movies');

  }

  function signOut() {
    navigate('/');
    setLoggedIn (false);
  }

  return (
    <div className="App">
      
      <Header>
        <NavBar loggedIn={loggedIn} />
      </Header>
      
      <Routes >
        <Route exact path='/' element = {<Main />} />
        <Route exact path='/sign-up' element = {<Register registration = {registration}/>} />
        <Route exact path='/sign-in' element = {<Login authorization = {authorization} />} />
        <Route exact path='/profile' element = {<Profile signOut={signOut}/>} />
        <Route exact path='/movies/*' element = {<Movies />} />
        <Route exact path='/saved-movies/*' element = {<Movies />} />
        <Route exact path='/404' element = {<NotFound />} />

        <Route path="/"
          element = {loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
        />

      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;
