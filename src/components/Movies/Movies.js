import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useState, useEffect} from 'react';
import {useContext} from 'react';

function Movies(
{onCardClick, onCardLike, onCardDelete, onBookmarkClick, isSavedCard}) {

    const currentUser = useContext(CurrentUserContext);


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

    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [shortCards, setShortCards] = useState(false);
    const [query, setQuery] = useState('');
    const [countFilms, setCountFilms] = useState(moviesCount);
    const [addCountFilms, setAddCountFilms] = useState(moviesAddCount);
    const [savedCards, setSavedCards] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const updateMovies = (cards) => {
        setCards(cards);
        localStorage.setItem('all_movies', JSON.stringify(cards));
    }

    const updateFilteredMovies = (cards) => {
        setFilteredCards(cards);
        localStorage.setItem('all_filtered_movies', JSON.stringify(cards));
    }

    const updateShortCards = (shortCards) => {
        setisLoading(true)
        setTimeout(() => {
            setCountFilms (moviesCount);
            setShortCards(shortCards);;
            localStorage.setItem('all_shortCards', JSON.stringify(shortCards));
            setisLoading(false)
        }, 600)
    }

    const updateQuery = (query) => {
        query = query.toLowerCase();
        setQuery(query);
        localStorage.setItem('all_query', query);
    }

    console.log (cards);

    useEffect (() => {
        const cards = JSON.parse(localStorage.getItem('all_movies') || '[]');
        updateMovies(cards);
        updateFilteredMovies(
            JSON.parse(localStorage.getItem('all_filtered_movies') || '[]')
        );
        updateQuery(localStorage.getItem('all_query') || '');
        updateShortCards(
            JSON.parse(localStorage.getItem('all_short_movies') || 'false')
        );

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
                    card => card.nameRU.toLowerCase().indexOf(query) >= 0,
                    
                );
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
                            placeholder="Фильм" value ={query}
                            onChange = {(event)=> updateQuery(event.target.value)} 
                        />
                        <div 
                            alt="" className="Movies__search-icon">
                        </div>
                    </div>
                    <button className="Movies__search-button" type="submit" />
                </form>
                <div className="Movies__search-checkbox">
                    <h2 className="Movies__separator-line"></h2>
                    <input
                        className="Movies__checkbox"
                        type="checkbox" checked={shortCards} 
                        onChange={ ()=> updateShortCards (!shortCards)}
                    />
                    <h2 className="Movies__checkbox_name"> Короткометражки </h2>
                </div>
            </div>
            
                <section className="Movies__elements">
                    {searchResult.slice (0, countFilms)
                    .map ((card) => {
                        return <MoviesCard 
                            onCardClick = {onCardClick} onCardLike = {onCardLike}
                            isSavedCard= {isSavedCard} onBookmarkClick={onBookmarkClick}
                            onCardDelete ={onCardDelete} card={card} key = {card.id}/>
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