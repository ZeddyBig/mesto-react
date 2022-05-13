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
import AddPlacePopup from "./AddPlacePopup";

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

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

  function handleAddCard(obj) {
    api.addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // Из Main.js

  useEffect(() => {
    api.getInitialCards()
      .then ((res) => {
        const cardInfo = res.map((cardData) => {
          return {
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            _id: cardData._id,
            ownerId: cardData.owner._id
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

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
          
          <PopupWithForm name={'delete-confirm'} title='Вы уверены?' buttonName={'Да'}/>
          
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
