import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__container-heading">{props.title}</h2>
                <button onClick={props.onClose} type="button" className="popup__close-button"></button>
                <form onSubmit={props.onSubmit} action="/" name={props.name} className="popup__form">
                    {props.children}                    
                    <button type="submit" className="popup__container-button popup__button">{props.buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;