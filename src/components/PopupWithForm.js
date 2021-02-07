import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
        <div className="popup__overlay" onClick={props.onClose}></div>
        <div className="popup__container">
          <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
          <form className="popup__form" id={`${props.name}-form`} name={props.name} action="#" method="post">
            <h3 className="popup__title">{props.title}</h3>
            {props.children}
            <button className="popup__submit-btn" type="submit">Сохранить</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm;