import {useState} from 'react';
import {Routes, Route} from 'react-router-dom';

function MoviesCard({handleClick, onBookmarkClick, isSavedCard, card}) {
    
    //const isSaved = isSavedCard(card);

    /*const cardLikeButtonClassName = (
        `MoviesCard__mesto-like ${isSaved ? 'MoviesCard__mesto-like_active opacity-like' : ''}`
    );*/

    const cardLikeButtonClassName = (
        `MoviesCard__mesto-like`
    );

    function durationTime(duration) {
        const hour = Math.round(duration/60);
        const min = duration-60;
        return `${hour}ч ${min}м`;
    }

    function handleBookmarkClick(evt) {
        evt.preventDefault();
        evt.target.classList.toggle('MoviesCard__mesto-like_active');
        //onBookmarkClick(card, !isSaved);
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
                                    onClick={handleBookmarkClick}
                                    className = {cardLikeButtonClassName}
                                    type ="button" aria-label="add-favorite" 
                                    /*className="rectangle__mesto-like opacity-like"*/
                                >
                                </button>
                        </div>
                        <img 
                            className="MoviesCard__image" onClick={handleClick}
                            src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU}
                        />
                        
                        
                    </article>
                </div>
    );
}

export default MoviesCard;