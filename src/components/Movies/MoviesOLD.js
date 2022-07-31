import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import mainApi from "../../utils/MainApi";
import {useState, useEffect} from 'react';


function Movies({onCardLike, isLikedCard}) {

    const apiURL = 'https://api.nomoreparties.co/beatfilm-movies'

    let moviesCount = 5;
    let moviesAddCount = 2;
    
    const onResize = () => {
        if (window.innerWidth >= 1280) {
            moviesCount = 12;
            moviesAddCount =3;
        } else if (window.innerWidth >= 768) {
            moviesCount = 8;
            moviesAddCount = 2;
        } else {
            moviesCount = 5;
            moviesAddCount = 2;
        }
    }
    window.onresize = () => {
        setTimeout(onResize, 1000)
    };
    onResize();

    // стэйт всех фильмов
    const [cards, setCards] = useState([]);
    // стэйт результатов поиска по фильмам
    const [filteredCards, setFilteredCards] = useState([]);
    // стэйт короткометражек (чекбокса)
    const [shortCards, setShortCards] = useState(false);
    // стэйт поисковой строки
    const [query, setQuery] = useState('');
    const [countFilms, setCountFilms] = useState(moviesCount);
    const [addCountFilms, setAddCountFilms] = useState(moviesAddCount);
    
    const [isLoading, setisLoading] = useState(false);
    

    const updateMovies = (cards) => {
        setCards(cards);
        localStorage.setItem('all_movies', JSON.stringify(cards));
    }
    
    const updateFilteredMovies = (cards) => {
        setFilteredCards(cards);
        localStorage.setItem('all_filtered_movies', JSON.stringify(cards));
    }

    const updateShortMovies = (shortCards) => {
        setisLoading(true)
        setTimeout(() => {
            setCountFilms (moviesCount);
            setShortCards(shortCards);
            localStorage.setItem('all_short_movies', JSON.stringify(shortCards));
            setisLoading(false)
        }, 600)
    }

    const updateQuery = (query) => {
        query = query.toLowerCase();
        setQuery(query);
        localStorage.setItem('all_query', query);
    }

    console.log(cards);

    ////////////////////////////////////////////////////////////////////////
    
    
    /*function addFavoriteMovie(card) {
        mainApi.createMovie(card)
        .then((res) => {
            //console.log(res);
            console.log(card);
            //console.log(card.id);
            setFavoriteCards([...favoriteCards, { ...res, id: res.movieId }]);
        })
        .catch(() => {
            //
        });
    }*/

    

    /*function deleteFavoriteMovie (card) {
        //const id = favoriteCards.find(i => i === currentUser._id);
        //const id = setFavoriteCards.includes((item) => item.id === card.id)._id;
        mainApi.deleteMovie(card._id)
        .then(() => {
            setFavoriteCards((cards) => cards.filter((i) => i._id !== card._id));
        })
        .catch(err => {
            console.log (`Ошибка: ${err}`)
        })
    }*/


    useEffect (() => {
        const cards = JSON.parse(localStorage.getItem('all_movies') || '[]');
        updateMovies(cards);
        updateFilteredMovies(
            JSON.parse(localStorage.getItem('all_filtered_movies') || '[]')
        );
        updateQuery(localStorage.getItem('all_query') || '');
        updateShortMovies(
            JSON.parse(localStorage.getItem('all_short_movies') || 'false')
        );

        /*function getFavoriteMovies() {
            mainApi.getMovies()
                .then((data) => {
                const savedArray = data.map((item) => {
                    return { ...item, id: item.movieId };
                });
                localStorage.setItem("all_favorite_movies", JSON.stringify(savedArray));
                setFavoriteCards(savedArray);
            })
            .catch(() => {
                localStorage.removeItem("all_favorite_movies");
                //error
            });
        }*/
        
        if (!cards.length) {
            fetch (apiURL, {
                method: 'GET',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'aplication/json'
                },
            })
            .then((res) => res.json())
            .then((res) => {
            updateMovies(res);
            updateFilteredMovies([]);
            updateShortMovies([])
            //getFavoriteMovies([])
            })
        }
    }, []);

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        setisLoading(true)
        setTimeout(() => {
            if (query.length){
                const filteredCards = cards.filter (
                    (card) => card.nameRU.toLowerCase().indexOf(query) >= 0,
            );
                console.log(filteredCards);
                updateFilteredMovies(filteredCards)
                setisLoading(false)
            } else {
                updateFilteredMovies(cards)
                setisLoading(false)
            }
        }, 600)
    }

    const addMovies = () => {
        setisLoading(true)
        setTimeout(() => {
            setCountFilms (countFilms + addCountFilms)
            setisLoading(false)
        }, 600)
    }

    const searchResult = filteredCards.filter(
        (card) => !shortCards || card.duration <= 40
    )

    return (
        <main>
            
            <div className="Movies__container">

                <form className="Movies__search" onSubmit={handleSubmit}>
                    <div className= "Movies__search-input">
                        <input 
                            type="text" className="Movies__search-field"
                            placeholder="Фильм" value ={query} required
                            onChange = {(event)=> updateQuery(event.target.value)} 
                        />
                        <div 
                            alt="" className="Movies__search-icon">
                        </div>
                    </div>
                    <button className="Movies__search-button opacity-buttons" type="submit" />
                </form>
                <div className="Movies__search-checkbox">
                    <h2 className="Movies__separator-line"></h2>
                    <input
                        className="Movies__checkbox"
                        type="checkbox" checked={shortCards} 
                        onChange={ ()=> updateShortMovies (!shortCards)}
                    />
                    <h2 className="Movies__checkbox_name"> Короткометражки </h2>
                </div>
            </div>
            
                <section className="Movies__elements">
                    {searchResult.slice(0, countFilms)
                    .map ((card) => {
                        return <MoviesCard 
                            onCardLike = {onCardLike}
                            isLikedCard= {isLikedCard}
                            card={card} key = {card.id}
                        />
                    })}
                </section>
                {isLoading && <Preloader/> }
                {countFilms < searchResult.length && (
                    <button className="Movies__add-button opacity-buttons" 
                        type="button"onClick={addMovies}>
                            Ещё
                    </button>   
                )}
            
        </main>
    );
}

export default Movies;