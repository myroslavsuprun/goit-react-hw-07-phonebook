import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/operations';

import { ContactsItem, ContactsButton } from './Contact.styled';

const Contact = ({ name, phone, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const onDeleteBtnClick = id => {
    setIsDeleting(true);
    dispatch(deleteContact(id));
  };

  return (
    <ContactsItem>
      {name}
      <br />
      {phone}
      <ContactsButton
        disabled={isDeleting}
        onClick={() => onDeleteBtnClick(id)}
      >
        {isDeleting ? 'Deleting' : 'Delete'}
      </ContactsButton>
    </ContactsItem>
  );
};

export default Contact;
