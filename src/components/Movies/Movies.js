import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import mainApi from "../../utils/MainApi";
import {useState, useEffect} from 'react';

function Movies({cards, query, shortCards, updateQuery, onSubmitSearch, updateShortMovies,
    onCardLike, isLikedCard}) {

    const getloadStep = (width) => {
        if (width >= 1280) {
            return 3;
        } else if (width= 768) {
            return 2;
        } else {
            return 2;
        }
    }

    const getInitialCount = (width) => {
        if (width >= 1280) {
            return 12;
        } else if (width= 768) {
            return 8;
        } else {
            return 5;
        }
    }
    const [width, setWidth] = useState(window.innerWidth);//стэйт ширины экрана
    //сколько сейчас отображается фильмов
    const [visibleFilmsCount, setVisibleFilmsFilmsCount] = useState(getInitialCount(width));

    const [isLoading, setisLoading] = useState(false); //стэйт прелоадера

    //console.log('width:', width);

    useEffect(() => {
        let timeoutId = null;

        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
            //timeoutId = setTimeout
        }

        window.addEventListener('resize', resizeListener)

        return() => {
            window.removeEventListener('resize', resizeListener)
        };
        
    }, [])


    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmitSearch(query);
    }

    const addMovies = () => {
        setisLoading(true)
        setTimeout(() => {
            setVisibleFilmsFilmsCount((prevCount)=> prevCount + getloadStep(width));
            setisLoading(false)
        }, 600)
    }

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
                        onChange={()=> updateShortMovies (!shortCards)}
                    />
                    <h2 className="Movies__checkbox_name"> Короткометражки </h2>
                </div>
            </div>
        
            
                <section className="Movies__elements">
                    {/*searchResult.slice(0, countFilms)*/
                    cards.slice(0, visibleFilmsCount).map ((card) => {
                        return <MoviesCard 
                            onCardLike = {onCardLike}
                            isLikedCard= {isLikedCard}
                            card={card} key = {card.id}
                        />
                    })}
                </section>
                {isLoading && <Preloader/>}
                {visibleFilmsCount < cards.length && (
                    <button className="Movies__add-button opacity-buttons" 
                        type="button"onClick={addMovies}>
                            Ещё
                    </button>   
                )}
            
        </main>
    );
}

export default Movies;