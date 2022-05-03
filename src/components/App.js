import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main'; 
import PopupWithForm from './PopupWithForm'; 
import ImagePopup from './ImagePopup';

function App() {

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
  
  return (
    <div className="App">
      <div className="page">
        <Header/>
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer/>

        <PopupWithForm name={'update-avatar'} title={'Обновить аватар'} buttonName={'Сохранить'} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input onChange={handleInputFirst} id="update-avatar" type="url" value={inputValueFirst} name="popup__container-line_theme_update-avatar" placeholder="Ссылка на картинку" required className="popup__container-line popup__container-line_theme_place-link popup__input"/>
          <span id="error-update-avatar" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>

        <PopupWithForm name={'profile-edit'} title={'Редактировать профиль'} buttonName={'Сохранить'} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input onChange={handleInputFirst} id="name" type="text" value={inputValueFirst} name="popup__container-line_theme_name" placeholder="Имя" className="popup__container-line popup__container-line_theme_name popup__input" required minLength="2" maxLength="40"/>
          <span id="error-name" className="popup__input-type-error popup__error-first popup__error popup__error_active"></span>
          <input onChange={handleInputSecond} id="job" type="text" value={inputValueSecond} name="popup__container-line_theme_job" placeholder="Работа" className="popup__container-line popup__container-line_theme_job popup__input" required minLength="2" maxLength="200"/>
          <span id="error-job" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>

        <PopupWithForm name={'add-element'} title={'Новое место'} buttonName={'Создать'} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input onChange={handleInputFirst} id="place-name" type="text" value={inputValueFirst} name="popup__container-line_theme_place-name" placeholder="Название" className="popup__container-line popup__container-line_theme_place-name popup__input" required minLength="2" maxLength="30"/>
          <span id="error-place-name" className="popup__input-type-error popup__error-first popup__error popup__error_active"></span>
          <input onChange={handleInputSecond} id="place-url" type="url" value={inputValueSecond} name="popup__container-line_theme_place-link" placeholder="Ссылка на картинку" required className="popup__container-line popup__container-line_theme_place-link popup__input"/>
          <span id="error-place-url" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>

        <PopupWithForm name={'delete-confirm'} title={'Вы уверены?'} buttonName={'Да'}/>
        
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
