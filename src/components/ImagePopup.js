import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup_type_opened-img popup-img ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup-img__container">
            <img src={props.card.link} alt={props.card.name} className="popup-img__full-img" />
            <p className="popup-img__full-img-text">{props.card.name}</p>
            <button onClick={props.onClose} type="button" className="popup__close-button popup__close-button_type_opened-img"></button>
        </div>
    </div>
  )
}

export default ImagePopup;