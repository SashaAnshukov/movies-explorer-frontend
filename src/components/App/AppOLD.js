import './App.css';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import * as Auth from '../Auth/Auth';
import {useState, useEffect} from 'react';

function App() {
  const navigate = useNavigate();

  const [currentUser , setCurrentUser] = useState('');

  // стэйт пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);
  // стэйт избранных фильмов
  const [favoriteCards, setFavoriteCards] = useState([]);

  // стэйт всех фильмов
  const [cards, setCards] = useState([]);

useEffect(() => {
  if (loggedIn) {
    mainApi.getUserData().then(res => {
      //console.log(res.data);
      /*if(!res.ok){
        throw Error ('Не удалось получить данные для этого ресурса')
        }*/
      setCurrentUser(res.data);

        /*setName(res.data.name);
        setEmail(res.data.email);*/
    })
    .catch(err => {
        console.log (`Ошибка: ${err}`)
      })
    }
}, [loggedIn])

function registration({name, email, password}) {
  Auth.register(name, email, password)
  .then((response) => {
    /*setTimeout(setShowToolTip, 1000, true);
    ChooseInfoTooltip({
      image: success,
      text:'Вы успешно зарегистрировались'
    })*/
    setTimeout(navigate, 3000, '/signin');
  })
  .catch((err) => {
    /*setTimeout(setShowToolTip, 1000, true);
    ChooseInfoTooltip({
      image: error,
      text: "Что-то пошло не так! Попробуйте еще раз!",
    });*/
  });
}

function authorization({email, password}) {
  Auth.authorize(email, password)
  .then((data) => {
    if (!data){
      setLoggedIn(false);
      /*setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: error,
        text: "Что-то пошло не так! Попробуйте еще раз!",
        });*/
    }
    else {
      setLoggedIn(true);
      navigate('/movies');
      }
    })
}

useEffect(() => {
  mainApi.getUserData()
  .then((res) => {
  //console.log(res)
    if (res) {
      setLoggedIn(true);
        navigate({ replace: false });
    }
  })
  .catch(() => {
    setLoggedIn(false);
  });
}, []);

/////////////////////////////////////Добавление в избранное//////////////////////////////////////////////

function isLikedCard(card) {
  return favoriteCards.some((item) => item.id === card.id);
}

function onCardLike(card, isLiked) {
    if (isLiked) {
        addFavoriteMovie(card);
    } else {
        deleteFavoriteMovie(card);
    }
}

const addFavoriteMovie = (newCard) => {
  mainApi.createMovie(newCard)
  .then((res) => {
      console.log(res);
      const newFavouriteList = [newCard, ...favoriteCards];
      setFavoriteCards(newFavouriteList);
      //updateFavoriteMovies(newFavouriteList);
  })
  .catch(err => {
    console.log (`Ошибка: ${err}`)
  })
};

/*let idCard = favoriteCards.find(item => item.id);
console.log(idCard.id)*/

const deleteFavoriteMovie = (card) => {
  console.log(card._id)
  mainApi.deleteMovie(card._id)   
  .then(() => {
      const newFavouriteList = favoriteCards.filter(
          (favoriteCards) => favoriteCards._id !== card._id
      );
      setFavoriteCards(newFavouriteList);
      //updateFavoriteMovies(newFavouriteList);
  })
  .catch(err => {
      console.log (`Ошибка: ${err}`)
  })
};

const updateMovies = (cards) => {
  setCards(cards);
  localStorage.setItem('all_movies', JSON.stringify(cards));
}

useEffect(() => {
  const cards = JSON.parse(localStorage.getItem('all_movies') || '[]');
  updateMovies(cards);
  const favoriteCards = JSON.parse(localStorage.getItem('all_favorite_movies') || '[]');
  if (favoriteCards) {
    setFavoriteCards(favoriteCards);
  }
  getFavoriteMovies(favoriteCards);
}, []);

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Отправляем запрос в API и получаем избранные фильмы
function getFavoriteMovies() {
  mainApi.getSavedMovies()
    .then((data) => {
      console.log(data)
      const savedArray = data.map((item) => {
        return { ...item, id: item.movieId };
      });
      localStorage.setItem("all_favorite_movies", JSON.stringify(savedArray));
      setFavoriteCards(savedArray);
      console.log(favoriteCards)
    })
    .catch(() => {
      /*localStorage.removeItem("savedMovies");
      setLoadingError(
        "Проблема с соединением или сервер недоступен. Пожалуйста, попробуйте ещё раз"
      );*/
    });
}
getFavoriteMovies();
console.log(favoriteCards)
console.log(cards)



// Отправляем запрос в API и обновляем значения профиля
function handleUpdateUser (dataUser) {
  console.log(dataUser)
  mainApi.setUserData(dataUser).then((res) => {
    setCurrentUser(res.data);
  })
  .catch(err => {
    console.log (`Ошибка: ${err}`)
  })
  //.finally(() => setisLoadingButton(false)); 
}
  

  // хук для автологина при обновлении страницы
  // если получаем данные пользователя значит, авторизационные куки передаются успешно
useEffect(() => {
  mainApi.getUserData()
  .then((res) => {
  //console.log(res)
    if (res) {
      setLoggedIn(true);
        navigate({ replace: false });
    }
  })
  .catch(() => {
    setLoggedIn(false);
  });
}, []);

function signOut() {
  Auth.logout();
  navigate('/');
  setLoggedIn (false);
  setCurrentUser('');
}

  /*<Route exact path='/*' element = {
    <ProtectedRoute loggedIn={loggedIn} >
      <Route exact path='/profile' element = {<Profile signOut={signOut}/>} />
      <Route exact path='/movies/*' element = {<Movies />} />
      <Route exact path='/saved-movies/*' element = {<Movies />} />
    </ProtectedRoute> 
  }/>*/

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header >
          <NavBar loggedIn={loggedIn} />
        </Header>

        <Routes >

          <Route exact path='/signup' element = {<Register registration = {registration}/>} />
          <Route exact path='/signin' element = {<Login authorization = {authorization} />} />
          <Route exact path='/' element = {<Main />} />
          <Route exact path='/404' element = {<NotFound />} />

          <Route exact path='/movies' element = {
            <ProtectedRoute loggedIn={loggedIn} >
              <Movies
                onCardLike={onCardLike}
                isLikedCard={isLikedCard}
              />
            </ProtectedRoute> 
          }/>

          <Route exact path='/saved-movies' element = {
            <ProtectedRoute loggedIn={loggedIn} >
              <Movies
                onCardLike={onCardLike}
                isLikedCard={isLikedCard}
              />
            </ProtectedRoute> 
          }/> 

          <Route exact path='/profile' element = {
            <ProtectedRoute loggedIn={loggedIn} >
              <Profile onUpdateUser = {handleUpdateUser} signOut={signOut} />
            </ProtectedRoute> 
          }/>

          <Route path="/"
            element = {loggedIn ? <Navigate to="/movies" /> : <Navigate to="/signin" />}
          />

        </Routes>
        
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
