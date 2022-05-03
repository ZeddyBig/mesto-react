import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfile()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(err))
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then ((res) => {
        const cardInfo = res.map((cardData) => {
          return {
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            id: cardData._id
          }
        })
        setCards(cardInfo);
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__button" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
          </div>
          <div className="profile__info">
            <div className="profile__name-and-edit">
              <h1 className="profile__name">{userName}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit"></button>
            </div>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {
            cards.map((card) => (
              <Card card={card} key={card.id} onCardClick={onCardClick} name={card.name}/>
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;