import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = React.useState(false);  
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

  function handleRemovePlaceClick(card) {
    setIsRemovePlacePopupOpen(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsRemovePlacePopupOpen(false);
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
  
  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        const newList = cards.filter((c) => c._id !== card._id);
        setCards(newList);
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
          onCardDelete={handleRemovePlaceClick}
        />
        <Footer />
      
        {/* Аватарка */}
        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />
      
        {/* Юзер */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
      
        {/* Добавление карточек */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
      
        {/* Удаление карточек */}
        <RemovePlacePopup
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
      
        {/* Просмотр картинок */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}