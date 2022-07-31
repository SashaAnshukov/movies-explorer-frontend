import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import mainApi from "../../utils/MainApi";
import {useState, useEffect} from 'react';


function Movies({cards, handleSubmit, onCardLike, isLikedCard,
    value, updateQuery,checked, updateShortMovies, isLoading}) {

    const [extraPortion, setExtraPortion] = useState(3);
    const [currentCount, setCurrentCount] = useState(0);
    const [renderMovies, setRenderMovies] = useState([]);

    function getCount(windowSize) {
        if (windowSize > 768) {
        return { first: 12, extra: 3 }
        } else if (windowSize > 480 && windowSize <= 768) {
        return { first: 8, extra: 2 }
        } else {
        return { first: 5, extra: 2 }
        }
    }
    
    function renderExtraPortion() {
        const count = Math.min(cards.length, currentCount + extraPortion);
        const extraMovies = cards.slice(currentCount, count)
        setRenderMovies([...renderMovies, ...extraMovies]);
        setCurrentCount(count);
    }
    
    function handleResize() {
        const windowSize = window.innerWidth;
        const sizePortion = getCount(windowSize);
        setExtraPortion(sizePortion.extra);
    }
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    useEffect(() => {
        const windowSize = window.innerWidth;
        const sizePortion = getCount(windowSize);
        setExtraPortion(sizePortion.extra);
        const count = Math.min(cards.length, sizePortion.first);
        setRenderMovies(cards.slice(0, count));
        setCurrentCount(count);
    }, [cards])
    
    function handleMoreCards() {
        renderExtraPortion();
    }

    function handleChangeQuery(e) {
        updateQuery(e.target.value);
    }

    function handleShortMovies(e) {
        updateShortMovies(!checked);
    }


    return (
        <main>
            
            <div className="Movies__container">

                <form className="Movies__search" onSubmit={handleSubmit}>
                    <div className= "Movies__search-input">
                        <input 
                            type="text" className="Movies__search-field"
                            placeholder="Фильм" value ={value} required
                            onChange = {handleChangeQuery} 
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
                        type="checkbox" checked={checked} 
                        onChange={handleShortMovies}
                    />
                    <h2 className="Movies__checkbox_name"> Короткометражки </h2>
                </div>
            </div>
            
                <section className="Movies__elements">
                    {renderMovies.map ((card) => {
                        return <MoviesCard 
                            onCardLike = {onCardLike}
                            isLikedCard= {isLikedCard}
                            card={card} key = {card.id}
                        />
                    })}
                </section>
                {isLoading && <Preloader/> }
                {currentCount < cards.length &&
                    <button className="Movies__add-button opacity-buttons" 
                        type="button"onClick={handleMoreCards}>
                            Ещё
                    </button>   
                }
            
        </main>
    );
}

export default Movies;