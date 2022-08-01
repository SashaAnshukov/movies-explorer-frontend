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

  const [cards, setCards] = useState([]); // стэйт всех фильмов
  const [loggedIn, setLoggedIn] = useState(false); // стэйт пользователя — вошёл он в систему или нет
  const [favoriteCards, setFavoriteCards] = useState([]); // стэйт избранных фильмов из нашего апи
  const [query, setQuery] = useState(''); // стэйт поисковой строки
  const [filteredCards, setFilteredCards] = useState([]); // стэйт результатов поиска по фильмам
  const [shortCards, setShortCards] = useState(false); // стэйт короткометражек (чекбокса)
  //const [countFilms, setCountFilms] = useState(moviesCount);

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

const updateMovies = (cards) => {
  setCards(cards);
  localStorage.setItem('all_movies', JSON.stringify(cards));
}

const updateFavoriteMovies = (movies) => {
  setCards(movies);
  localStorage.setItem('all_favorite_movies', JSON.stringify(movies));
}

// Отправляем запрос в bestFilms и получаем все фильмы
const fetchAllMovies = () => {
  
    fetch ('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'aplication/json'
      },
    })
    .then((res) => res.json())
    .then(res => {
      console.log(res)
      updateMovies(res)
    })
  
}

// Отправляем запрос в API и получаем избранные фильмы

const fetchFavoriteMovies = () => {
  //if (loggedIn) {
      mainApi.getSavedMovies()
        .then(movies => {
          console.log(movies)
          /*const savedArray = res.data.map((item) => {
            return { ...item, id: item.movieId };
          });*/
          updateFavoriteMovies(movies)
        })
        .catch(() => {
          localStorage.removeItem("all_favorite_movies");
          //setLoading --- ошибка
        });
  //}
}

useEffect(() => {
  if (loggedIn) {
    fetchAllMovies();
    fetchFavoriteMovies();
  }
}, [loggedIn]);

useEffect(() => {
  const localCards = localStorage.getItem('all_movies');
  const localFavoriteCards = localStorage.getItem('all_favorite_movies');
  
  if(localCards){
    try {
      setCards(JSON.parse(localCards));
    }
    catch (err){
      localStorage.removeItem('all_movies');
      fetchAllMovies();
    }
  } else{
    fetchAllMovies();
  }

  if(localFavoriteCards){
    try {
      setFavoriteCards(JSON.parse(localFavoriteCards));
    }
    catch (err){
      localStorage.removeItem('all_favorite_movies');
      fetchFavoriteMovies();
    }
  } else{
    fetchFavoriteMovies();
  }

}, [])

/////////////////////////////////////Добавление в избранное//////////////////////////////////////////////

function isLikedCard(card) {
  return favoriteCards.some((i) => i.id === card.id);
}

function onCardLike(card, isLiked) {
    if (isLiked) {
        addFavoriteMovie(card);
    } else {
        deleteFavoriteMovie(card);
    }
}

const addFavoriteMovie = (newCard) => {
  //const movieId = favoriteCards.find((item) => item.id === movie.id)._id;
  //console.log(movieId);
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
/*
useEffect(() => {
  const cards = JSON.parse(localStorage.getItem('all_movies') || '[]');
  updateMovies(cards);
  const favoriteCards = JSON.parse(localStorage.getItem('all_favorite_movies') || '[]');
  if (favoriteCards) {
    setFavoriteCards(favoriteCards);
  }
  getFavoriteMovies(favoriteCards);
}, []);*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
const updateFilteredMovies = (cards) => {
  setFilteredCards(cards);
  localStorage.setItem('all_filtered_movies', JSON.stringify(cards));
}

const updateShortMovies = (shortCards) => {
  //setisLoading(true)
  //setTimeout(() => {
      //setCountFilms (moviesCount);
      setShortCards(shortCards);
      localStorage.setItem('all_short_movies', JSON.stringify(shortCards));
      //setisLoading(false)
  //}, 600)
}

const updateQuery = (query) => {
  query = query.toLowerCase();
  setQuery(query);
  localStorage.setItem('all_query', query);
}

const onSubmitSearch = () => {
  // Запрещаем браузеру переходить по адресу формы
  //setisLoading(true)
  //setTimeout(() => {
      if (query.length){
          const filteredCards = cards.filter (
              (card) => card.nameRU.toLowerCase().indexOf(query) >= 0,
      );
          console.log(filteredCards);
          updateFilteredMovies(filteredCards)
          //setisLoading(false)
      } else {
          updateFilteredMovies(cards)
          //setisLoading(false)
      }
  //}, 600)
}
useEffect(() => {

  updateFilteredMovies(
    JSON.parse(localStorage.getItem('all_filtered_movies') || '[]')
  );

  updateQuery(localStorage.getItem('all_query') || '');

  updateShortMovies(
    JSON.parse(localStorage.getItem('all_short_movies') || 'false')
  );

}, [])


//фильтрация результата поиска
const searchResult = filteredCards.filter((card) => !shortCards || card.duration <= 40)
////////////////////////////////////////////////////////////////////////////////////////////////////////


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
                cards={searchResult}
                query={query}
                shortCards={shortCards}
                updateQuery={updateQuery}
                updateShortMovies={updateShortMovies}
                isLikedCard={isLikedCard}
                onCardLike={onCardLike}
                onSubmitSearch={onSubmitSearch}
              />
            </ProtectedRoute> 
          }/>

          <Route exact path='/saved-movies' element = {
            <ProtectedRoute loggedIn={loggedIn} >
              <Movies 
                cards={favoriteCards}
                query={query}
                shortCards={shortCards}
                updateQuery={updateQuery}
                updateShortMovies={updateShortMovies}
                isLikedCard={isLikedCard}
                onCardLike={onCardLike}
                onSubmitSearch={onSubmitSearch}
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
