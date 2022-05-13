import React from 'react';
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    
    function handleClick() {
        props.onCardClick(props.card);
    }
    
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? '' : 'element__trash_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-button ${isLiked ? "element__like-button_active" : ""}`;

    return (
        <li className="element" key={props.card.id}>
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__button-and-like">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                    <span className="element__like-count">{props.card.likes.length}</span>
                </div>
            </div>
            <button onClick={handleDeleteClick} type="button" className={cardDeleteButtonClassName}></button>
        </li>
    )
}

export default Card;