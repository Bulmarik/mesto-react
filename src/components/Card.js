import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {




  
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__del-btn' : ''}`
  );

  const isLiked = props.card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-btn ${isLiked ? 'elements__like-btn_active' : ''} `;






  function handleClick() {
      props.onCardClick(props.card);
  }

  return (
    <li className="elements__item">
      <button className="elements__del-btn" type="button" />
      <img className="elements__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="elements__description">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__like">
          <button className="elements__like-btn" type="button" />
          <div className="elements__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;