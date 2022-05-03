import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="element" key={props.card.id}>
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleClick}/>
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__button-and-like">
                    <button type="button" className="element__like-button"></button>
                    <span className="element__like-count">{props.card.likes.length}</span>
                </div>
            </div>
            <button type="button" className="element__trash"></button>
        </li>
    )
}

export default Card;