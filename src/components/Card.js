import React from 'react';

function Card(props) {

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