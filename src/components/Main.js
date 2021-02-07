import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUser(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
        setCards(initialCards)
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }, [])

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${userAvatar})`}} alt="Аватарка" />
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map((data) => {
            return (
              <Card card={data} key={data._id} onCardClick={props.onCardClick}/>
            )
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;