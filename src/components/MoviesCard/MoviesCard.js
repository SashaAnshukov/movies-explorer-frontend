import {useState} from 'react';
import {useLocation} from 'react-router-dom';
//import {useLocation} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';


function MoviesCard({onCardLike, card}) {

    const {pathname} = useLocation();
    const image = pathname === `${"/movies"}` ? `https://api.nomoreparties.co${card.image.url}`: `${card.image}`;
    

    // Определяем, добавил ли текущий пользователь в избранное этот фильм
    const {isLiked} = card;

    const cardLikeButtonClassName = pathname === `${"/movies"}` 
    ? (
        `MoviesCard__mesto-like ${isLiked ? 'MoviesCard__mesto-like_active' : ''}`
    )
    : (
        `MoviesCard__mesto-like ${isLiked ? 'MoviesCard__remove-like' : ''}`
    )
    
    /*const cardLikeButtonClassName = (
        `MoviesCard__mesto-like ${isLiked ? 'MoviesCard__mesto-like_active' : ''}`
    );*/

    function handleLikeClick(evt) {
        evt.preventDefault();
        onCardLike(card, !isLiked);
    }

    /*function handleClick(evt) {
        evt.preventDefault();
        handleFavouritesClick(card);
        evt.target.classList.toggle('MoviesCard__mesto-like_active');
    }*/


    function durationTime(duration) {
        const hour = Math.round(duration/60);
        const min = duration-60;
        return `${hour}ч ${min}м`;
    }
    
    /*function handleDelete() {
        onBookmarkClick(card, false);
    }*/

    return (
                <div className="rectangle-item-template">
                    <article className="MoviesCard">
                        <div className="MoviesCard__info">
                            <div>
                                <h2 className="MoviesCard__text">{card.nameRU}</h2>
                                <span className="MoviesCard__duration">{durationTime(card.duration)}</span>
                            </div>
                                <button
                                    onClick={handleLikeClick}
                                    className = {cardLikeButtonClassName}
                                    type ="button" aria-label= "add-favorite" 
                                    /*className="rectangle__mesto-like opacity-like"*/
                                >
                                </button>
                        </div>
                        <a href={card.trailerLink} target="_blank" rel="noreferrer" >
                            <img 
                                className="MoviesCard__image"
                                src={image}
                                alt={card.nameRU}
                            />
                        </a>
                    </article>
                </div>
    );
}

export default MoviesCard;