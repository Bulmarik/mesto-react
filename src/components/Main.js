import React from 'react';
import api from '../utils/api';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const currentUser = React.useContext(CurrentUserContext);

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

  React.useEffect(() => {
    // Promise.all([api.getUser(), api.getInitialCards()])
    api.getInitialCards()
    .then((initialCards) => {
      // .then(([user, initialCards]) => {
        // setUserName(user.name)
        // setUserDescription(user.about)
        // setUserAvatar(user.avatar)
        setCards(initialCards)
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }, [])

  // console.log('hi!');

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}} alt="Аватарка" />
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map((data) => {
            return (
              <Card card={data} key={data._id} onCardClick={props.onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            )
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;