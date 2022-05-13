import React from "react";
import { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 
  
    function handleNameChange(e) {
        setName(e.target.value);
    }
  
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
          name,
          about: description,
        });
      }
    return (
        <PopupWithForm name={'profile-edit'} title='Редактировать профиль' buttonName={'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input onChange={handleNameChange} id="name" type="text" value={name || ""} name="popup__container-line_theme_name" placeholder="Имя" className="popup__container-line popup__container-line_theme_name popup__input" required minLength="2" maxLength="40"/>
            <span id="error-name" className="popup__input-type-error popup__error-first popup__error popup__error_active"></span>
            <input onChange={handleDescriptionChange} id="job" type="text" value={description || ""} name="popup__container-line_theme_job" placeholder="Работа" className="popup__container-line popup__container-line_theme_job popup__input" required minLength="2" maxLength="200"/>
            <span id="error-job" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;