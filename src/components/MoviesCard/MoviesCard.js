import {useContext} from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function MoviesCard({onCardClick, onCardLike, onCardDelete, card}) {
    const currentUser = useContext(CurrentUserContext);
    const { nameRU, image } = card;
    /// Определяем, являемся ли мы владельцем текущей карточки
    //const isOwn = card.owner === currentUser.id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    /*const cardDeleteButtonClassName = (
        `rectangle__trash ${isOwn ? 'rectangle__trash opacity-buttons' : 'rectangle__trash_hidden'}`
    ); */
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    //const isLiked = card.likes.some((i) => i === currentUser.id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
   /*const cardLikeButtonClassName = (
        `rectangle__mesto-like ${isLiked ? 'rectangle__mesto-like_active opacity-like' : ''}`
    );*/

    function handleClick() {
        onCardClick(card);
    }


    return (
                <div className="rectangle-item-template">
                    <article className="MoviesCard">
                        <img 
                            className="MoviesCard__image" onClick={handleClick}
                            src={image.url} alt={nameRU}/>
                        
                        <div className="MoviesCard__info">
                            <h2 className="MoviesCard__text">{card.nameRU}</h2>
                            




                            
                        </div>
                    </article>
                </div>
    );
}

export default MoviesCard;