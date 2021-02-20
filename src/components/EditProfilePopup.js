import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]); 

  function inputName(e) {
    setName(e.target.value);
  }

  function inputDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='edit-profile'
      title='Редактировать профиль'>
        <input className="popup__input popup__input_type_name" value={name} onChange={inputName} name="name" type="text" placeholder="Имя" required />
        <span className="popup__error" id="name-error" />
        <input className="popup__input popup__input_type_description" value={description} onChange={inputDescription} name="description" type="text" placeholder="О себе" required />
        <span className="popup__error" id="description-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;