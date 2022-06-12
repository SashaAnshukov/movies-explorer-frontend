import MoviesCard from '../MoviesCard/MoviesCard';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {useState, useEffect} from 'react';
import {useContext} from 'react';

function Movies(
{onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);


    const apiURL = 'https://api.nomoreparties.co/beatfilm-movies'

    let moviesCount = 5;
    let moviesAddCount = 2;
    window.onresize = () => {
        setTimeout (() => {
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
        }, 1000)
    };

    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [shortCards, setShortCards] = useState(false);
    const [query, setQuery] = useState('');
    const [countFilms, setCountFilms] = useState(moviesCount);
    const [addCountFilms, setAddCountFilms] = useState(moviesAddCount);

    const updateMovies = (cards) => {
        setCards(cards);
        localStorage.setItem('all_filtered_movies', JSON.stringify(cards));
    }

    const updateFilteredMovies = (cards) => {
        setFilteredCards(cards);
        localStorage.setItem('all_movies', JSON.stringify(cards));
    }

    const updateShortCards = (shortCards) => {
        setCountFilms (moviesCount);
        setShortCards(shortCards);;
        localStorage.setItem('all_shortCards', JSON.stringify(shortCards));
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
        });
        } else {
            //console.log({cards});
            setCards(cards);
        }
        const filteredCards = JSON.parse(localStorage.getItem('filtered_all_movies') || '[]');
        if (cards.length) {
            setFilteredCards(filteredCards)
        }
        
        const shortCards = JSON.parse(localStorage.getItem('all_short_movies') || 'false');
        setShortCards (shortCards);

        setQuery(localStorage.getItem('all_query') || '');

    }, []);

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        if (query.length){
            const filteredCards = cards.filter (
                card => card.nameRU.toLowerCase().indexOf(query) >= 0
            );
            updateFilteredMovies(filteredCards);
        } else {
            updateFilteredMovies(cards)
        }
    }

    const addMovies = () => {
        setCountFilms (countFilms + addCountFilms)
    }

    const searchResult = filteredCards.filter(
        (card) => !shortCards || card.duration <= 40
    )

    return (
        <main>
            <div className="page__container">
                <form onSubmit={handleSubmit}>
                    <input type="text"  value ={query} onChange = {(event)=> updateQuery(event.target.value)} />
                    <input type="checkbox" checked={shortCards} onChange={ ()=> updateShortCards (!shortCards)}/>
                    <button type="submit">Поиск</button>
                </form>
                <section className="elements">
                    {searchResult.slice (0, countFilms)
                    .map ((card) => {
                        return <MoviesCard 
                            onCardClick = {onCardClick} onCardLike = {onCardLike}
                            onCardDelete ={onCardDelete} card={card} key = {card.id}/>
                    })}
                    {countFilms < searchResult.length && (
                            <button type="button"  onClick={addMovies}>Ещё</button>
                        )
                    }
                </section>
            </div>
        </main>
    );
}

export default Movies;