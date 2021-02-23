import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  
  
  
  
  const [currentUser, setCurrentUser] = React.useState("");
  
  React.useEffect(() => {
    api.getUser()
    .then((res) => {
      setCurrentUser(res);
    })
    .catch((res) => {
      console.log(`Ошибка: ${res.status}`);
    }) 
  }, [])
  
  React.useEffect(() => {
    api.getInitialCards()
    .then((initialCards) => {
        setCards(initialCards)
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }, [])
  

  
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


  function handleUpdateUser(data) {
    api.setUser(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then ((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }





  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards)
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        const newList = cards.filter((c) => c._id !== card._id);
        setCards(newList);
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }






  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header />
        
        <Main className="content"
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
      
        <Footer />
      
        {/* Аватарка */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        {/* <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name='edit-avatar'
          title='Обновить аватар'>
            <input className="popup__input popup__input_type_avatar-url" name="ava-url" placeholder="Ссылка на аватар" type="url" required />
            <span className="popup__error" id="ava-url-error" />
        </PopupWithForm> */}
      
      
        {/* Юзер */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name='edit-profile'
          title='Редактировать профиль'>
            <input className="popup__input popup__input_type_name" name="name" type="text" placeholder="Имя" required />
            <span className="popup__error" id="name-error" />
            <input className="popup__input popup__input_type_description" name="description" type="text" placeholder="О себе" required />
            <span className="popup__error" id="description-error" />
        </PopupWithForm> */}
      
        {/* Добавление карточек */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        {/* <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name='add-card'
          title='Новое место'>
            <input className="popup__input popup__input_type_place" name="place" placeholder="Название" type="text" required />
            <span className="popup__error" id="place-error" />
            <input className="popup__input popup__input_type_url" name="card-url" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error" id="card-url-error" />
        </PopupWithForm> */}
      
        {/* Удаление карточек */}
        <div className="popup popup_type_delete">
          <div className="popup__overlay" />
          <div className="popup__container">
            <button className="popup__close-btn" type="button" />
            <form className="popup__form" id="delete-form" name="popup-form" action="#" method="post">
              <h3 className="popup__title">Вы уверены?</h3>
              <button className="popup__submit-btn" type="submit">Да</button>
            </form>
          </div>
        </div>
      
        {/* Просмотрт картинок */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
