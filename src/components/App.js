import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

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
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }
  
  return (
    <div className="page">
      <Header className="header"/>
      
      <Main className="content"
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer className="footer"/>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name='edit-avatar'
        title='Обновить аватар'
        children={(
          <>
            <input className="popup__input popup__input_type_avatar-url" name="ava-url" placeholder="Ссылка на аватар" type="url" required />
            <span className="popup__error" id="ava-url-error"></span>
          </>
        )}
      />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name='edit-profile'
        title='Редактировать профиль'
        children={(
          <>
            <input className="popup__input popup__input_type_name" name="name" type="text" placeholder="Имя" required />
            <span className="popup__error" id="name-error"></span>
            <input className="popup__input popup__input_type_description" name="description" type="text" placeholder="О себе" required />
            <span className="popup__error" id="description-error"></span>
          </>
        )}
      />

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name='add-card'
        title='Новое место'
        children={(
          <>
            <input className="popup__input popup__input_type_place" name="place" placeholder="Название" type="text" required />
            <span className="popup__error" id="place-error"></span>
            <input className="popup__input popup__input_type_url" name="card-url" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="card-url-error"></span>
          </>
        )}
      />

      <div className="popup popup_type_delete">
        <div className="popup__overlay"></div>
        <div className="popup__container">
          <button className="popup__close-btn" type="button"></button>
          <form className="popup__form" id="delete-form" name="popup-form" action="#" method="post">
            <h3 className="popup__title">Вы уверены?</h3>
            <button className="popup__submit-btn" type="submit">Да</button>
          </form>
        </div>
      </div>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
