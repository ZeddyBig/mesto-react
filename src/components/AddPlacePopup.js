import React from "react";
import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [cardTitle, setCardTitle] = useState("");
    const [cardLink, setCardLink] = useState("");

    function handleCardTitleChange(e) {
        setCardTitle(e.target.value);
    }

    function handleCardLinkChange(e) {
        setCardLink(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
    
        props.onAddCard({
            name: cardTitle,
            link: cardLink,
        });
    }
    
    useEffect(() => {
        setCardTitle("");
        setCardLink("");
    }, [props.isOpen]);

    return(
        <PopupWithForm name={'add-element'} title='Новое место' buttonName={'Создать'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
            <input onChange={handleCardTitleChange} id="place-name" type="text" value={cardTitle} name="popup__container-line_theme_place-name" placeholder="Название" className="popup__container-line popup__container-line_theme_place-name popup__input" required minLength="2" maxLength="30"/>
            <span id="error-place-name" className="popup__input-type-error popup__error-first popup__error popup__error_active"></span>
            <input onChange={handleCardLinkChange} id="place-url" type="url" value={cardLink} name="popup__container-line_theme_place-link" placeholder="Ссылка на картинку" required className="popup__container-line popup__container-line_theme_place-link popup__input"/>
            <span id="error-place-url" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;