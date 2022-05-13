import React from 'react';
import {api} from '../utils/api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <div className="profile__name-and-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit"></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card 
                card={card} 
                key={card._id} 
                onCardClick={onCardClick} 
                name={card.name} 
                onCardLike={onCardLike} 
                onCardDelete={onCardDelete}/>
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;