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
import Popup from '../Popup/Popup';
import success from "../../images/success.svg";
import error from "../../images/error.svg";
import {useState, useEffect} from 'react';

function App() {

  

  const [currentUser , setCurrentUser] = useState('');
  
  const [loggedIn, setLoggedIn] = useState(false); // стэйт пользователя — вошёл он в систему или нет
  const [cards, setCards] = useState([]); // стэйт всех фильмов
  const [favoriteCards, setFavoriteCards] = useState([]); // стэйт избранных фильмов из нашего апи
  const [query, setQuery] = useState(''); // стэйт поисковой строки
  const [favoriteQuery, setFavoriteQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]); // стэйт результатов поиска по фильмам
  const [filteredFavoriteCards, setFilteredFavoriteCards] = useState([]); //стэйт результатов поиска по избранным фильмам
  const [shortCards, setShortCards] = useState(false); // стэйт короткометражек (чекбокса)
  //const [countFilms, setCountFilms] = useState(moviesCount);
  const [showToolTip, setShowToolTip] = useState(false);// стэйт для модального окна при успешной/не успешной регистрации
  const [info, setInfo] = useState({ image: "", text: "" });// стэйт для данных модального окна при успешной/не успешной регистрации

  const navigate = useNavigate();

function ChooseInfoTooltip (info) {
  setInfo({ image: info.image, text: info.text });
}

const closeAllPopups = (form) => {
  setShowToolTip(false)
};

useEffect(() => {
  if (loggedIn) {
    mainApi.getUserData().then(res => {
      setCurrentUser(res.data);
    })
    .catch(err => {
        console.log (`Ошибка: ${err}`)
    })
  }
}, [loggedIn])

function registration(name, email, password) {
  Auth.register(name, email, password)
  .then((response) => {
    setTimeout(setShowToolTip, 1000, true);
    ChooseInfoTooltip({
      image: success,
      text:'Вы успешно зарегистрировались'
    })
    setLoggedIn(true);
    setTimeout(navigate, 3000, '/movies');
  })
  .catch((err) => {
    setTimeout(setShowToolTip, 1000, true);
    ChooseInfoTooltip({
      image: error,
      text: "Что-то пошло не так! Попробуйте еще раз!",
    });
  });
}

function authorization(email, password) {
  Auth.authorize(email, password)
  .then((data) => {
    if (!data){
      setLoggedIn(false);
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: error,
        text: "Что-то пошло не так! Попробуйте еще раз!",
        });
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
  const likedMovies = movies.map(card => ({...card, isLiked: true}))
  
  setFavoriteCards(likedMovies);
  localStorage.setItem('all_favorite_movies', likedMovies);
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
  mainApi.getSavedMovies()
    .then(movies => {
      console.log(movies)
      updateFavoriteMovies(movies)
    })
    .catch(() => {
      localStorage.removeItem("all_favorite_movies");
    });
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
  
  if(localCards && localCards.length){
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

  if(localFavoriteCards && localFavoriteCards.length){
    try {
      setFavoriteCards(JSON.parse(localFavoriteCards));
    }
    catch (err){
      if(loggedIn){
        localStorage.removeItem('all_favorite_movies');
        fetchFavoriteMovies();
      }
    }
  } else{
    if(loggedIn){
      fetchFavoriteMovies();
    }
  }

}, [])

/////////////////////////////////////Добавление в избранное//////////////////////////////////////////////

function isLikedCard(card) {
  return favoriteCards.some((i) => i.movieId === card.id);
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
        const newFavouriteList = [res.data, ...favoriteCards];
        console.log('newFavouriteList', newFavouriteList)
        updateFavoriteMovies(newFavouriteList);
    })
    .catch(err => {
      console.log (`Ошибка: ${err}`)
    })
};


const deleteFavoriteMovie = (card) => {
    mainApi.deleteMovie(card._id)
      .then(() => {
          const newFavouriteList = favoriteCards.filter(
              (favoriteCards) => favoriteCards._id !== card._id
          );
          updateFavoriteMovies(newFavouriteList)
      })
      .catch(err => {
          console.log (`Ошибка: ${err}`)
      })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
  const localFilteredCards = localStorage.getItem('all_filtered_movies');
  
  if(localFilteredCards && localFilteredCards.length){
    try {
      updateFilteredMovies(JSON.parse(localFilteredCards))
    }
    catch (err){
      localStorage.removeItem('all_filtered_movies');
      
    }
  }
  
}, [favoriteCards])

/*useEffect(() => {
  const localFilteredFavoriteCards = localStorage.getItem('all_filtered_favorite_movies');
  console.log('localFilteredFavoriteCards', localFilteredFavoriteCards)
  if(localFilteredFavoriteCards && localFilteredFavoriteCards.length){
    try {
      updateFilteredFavoriteMovies(JSON.parse(localFilteredFavoriteCards))
    }
    catch (err){
      localStorage.removeItem('all_filtered_favorite_movies');
      
    }
  }
  
}, [])*/

const updateFilteredMovies = (cards) => {
  const formatted = cards.map(card => ({
      ...card,
      _id: (favoriteCards.find(likedCard => likedCard.movieId === card.id) || {})._id,
      isLiked: isLikedCard(card)
    })
  )
  
  setFilteredCards(formatted);
  localStorage.setItem('all_filtered_movies', JSON.stringify(cards));
}

/*const updateFilteredFavoriteMovies = (favoriteCards) => {
  
  setFilteredFavoriteCards(favoriteCards);
  localStorage.setItem('all_filtered_favorite_movies', JSON.stringify(favoriteCards));
}*/

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

/*const updateFavoriteQuery = (favoriteQuery) => {
  favoriteQuery = favoriteQuery.toLowerCase();
  setFavoriteQuery(favoriteQuery);
  //localStorage.setItem('all_favorite_query', favoriteQuery);
}*/

///////////////////////////////Поиск по всем фильмам\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const onSubmitSearch = () => {
  // Запрещаем браузеру переходить по адресу формы
  //setisLoading(true)
  //setTimeout(() => {
      if (query.length){
          const filteredCards = cards.filter(
            (card) => card.nameRU.toLowerCase().indexOf(query) >= 0,
          );
          //console.log(filteredCards);
          updateFilteredMovies(filteredCards)
          //setisLoading(false)
      } else {
          updateFilteredMovies(cards)
          //setisLoading(false)
      }
  //}, 600)
}

///////////////////////////////Поиск по избранным фильмам\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*const onSubmitFavoriteSearch = () => {
  
      if (favoriteQuery.length){
          const filteredFavoriteCards = favoriteCards.filter(
            (card) => card.nameRU.toLowerCase().indexOf(favoriteQuery) >= 0,
          );
          
          updateFilteredFavoriteMovies(filteredFavoriteCards)
          
      } else {
        updateFilteredFavoriteMovies(favoriteCards)
        
      }
  
}*/


useEffect(() => {

  /*updateFilteredMovies(
    JSON.parse(localStorage.getItem('all_filtered_movies') || '[]')
  );*/

  updateQuery(localStorage.getItem('all_query') || '');
  //updateFavoriteQuery(localStorage.getItem('all_favorite_query') || '');
  updateShortMovies(
    JSON.parse(localStorage.getItem('all_short_movies') || 'false')
  );

}, [])

/*useEffect(() => {

  updateFavoriteQuery(localStorage.getItem('all_favorite_query') || '');

}, [])*/

//фильтрация результата поиска короткометражек
const searchResult = filteredCards.filter((card) => !shortCards || card.duration <= 40)
const searchFavoriteResult = favoriteCards.filter((card) => !shortCards || card.duration <= 40)
//const searchFilteredFavoriteResult = filteredFavoriteCards.filter((card) => !shortCards || card.duration <= 40)

////////////////////////////////////////////////////////////////////////////////////////////////////////F
// Отправляем запрос в API и обновляем значения профиля
function handleUpdateUser (dataUser) {
  console.log(dataUser)
  if (dataUser.name !== currentUser.name){
    mainApi.setUserData(dataUser).then((res) => {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: success,
        text:'Вы успешно обновили данные пользователя'
      })
      setTimeout(3000);
      setCurrentUser(res.data);
    })
    .catch(err => {
      //console.log(error.statusCode)
      if (err === 'Ошибка 409') {
        setTimeout(setShowToolTip, 1000, true);
        ChooseInfoTooltip({
          image: error,
          text: "Пользователь с таким email уже существует",
        });
        //console.log (`Ошибка: ${err}`)
      } else {
        setTimeout(setShowToolTip, 1000, true);
        ChooseInfoTooltip({
          image: error,
          text: "Что-то пошло не так! Попробуйте еще раз!",
        });
        console.log (`Ошибка: ${err}`)
      }
    })
  }else {
      setTimeout(setShowToolTip, 1000, true);
      ChooseInfoTooltip({
        image: error,
        text: "Имя совпадает с текущим",
      });
  }
  //.finally(() => setisLoadingButton(false)); 
}

  // хук для автологина при обновлении страницы
  // если получаем данные пользователя значит, авторизационные куки передаются успешно
useEffect(() => {
    mainApi.getUserData()
    .then((res) => {
    console.log(res)
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
          <Route exact path='/*' element = {<NotFound />} />

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
                cards={ searchFavoriteResult }
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

          <Route path='/'
            element = {loggedIn ? <Navigate to='/movies' /> : <Navigate to='/' />}
          />
        </Routes>

        <Popup 
          isOpen={showToolTip} 
          onClose={closeAllPopups} 
          info={info}
        />
        
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
