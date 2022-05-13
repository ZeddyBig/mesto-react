import React from 'react';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main'; 
import PopupWithForm from './PopupWithForm'; 
import ImagePopup from './ImagePopup';
import {api} from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {

  const [currentUser, setCurrentUser] = React.useState({});

  const [inputValueFirst, setInputValueFirst] = React.useState('');
  const [inputValueSecond, setInputValueSecond] = React.useState('');

  const handleInputFirst = (e) => {
    setInputValueFirst(e.target.value);
  }

  const handleInputSecond = (e) => {
    setInputValueSecond(e.target.value);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(info) {
    api.editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(obj) {
    api.updateAvatar(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Из Main.js
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then ((res) => {
        const cardInfo = res.map((cardData) => {
          return {
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            _id: cardData._id
          }
        })
        setCards(cardInfo);
      })
      .catch((err) => console.log(err))
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(cardToBeDeleted) {
    api.deleteCard(cardToBeDeleted._id)
    .then((res) => {
      setCards((state) => state.filter((c) => c._id !== cardToBeDeleted._id));
    })
    .catch((err) => console.log(err));
  }
  // Из Main.js конец
  
  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header/>
            <Main 
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick} 
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          <Footer/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <PopupWithForm name={'add-element'} title='Новое место' buttonName={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
            <input onChange={handleInputFirst} id="place-name" type="text" value={inputValueFirst} name="popup__container-line_theme_place-name" placeholder="Название" className="popup__container-line popup__container-line_theme_place-name popup__input" required minLength="2" maxLength="30"/>
            <span id="error-place-name" className="popup__input-type-error popup__error-first popup__error popup__error_active"></span>
            <input onChange={handleInputSecond} id="place-url" type="url" value={inputValueSecond} name="popup__container-line_theme_place-link" placeholder="Ссылка на картинку" required className="popup__container-line popup__container-line_theme_place-link popup__input"/>
            <span id="error-place-url" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
          </PopupWithForm>

          <PopupWithForm name={'delete-confirm'} title='Вы уверены?' buttonName={'Да'}/>
          
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
