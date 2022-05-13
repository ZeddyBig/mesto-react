import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name={'update-avatar'} title='Обновить аватар' buttonName={'Сохранить'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input ref={avatarRef} id="update-avatar" type="url" name="popup__container-line_theme_update-avatar" placeholder="Ссылка на картинку" required className="popup__container-line popup__container-line_theme_place-link popup__input"/>
            <span id="error-update-avatar" className="popup__input-type-error popup__error-second popup__error popup__error_active"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;