import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removeContact } from 'redux/contactsSlice';
import { getContactsList, getFilter } from 'redux/selectors';

import {
  ContactsListStyled,
  ContactsItem,
  ContactsButton,
} from './ContactsList.styled';

function getContactsIfFiltered(contactsList, filter) {
  if (filter === '') {
    return contactsList;
  }

  return contactsList.filter(contact => {
    const contactName = contact.name.toLowerCase();
    return contactName.includes(filter.toLowerCase());
  });
}

const ContactsList = () => {
  const dispatch = useDispatch();
  let { contactsList } = useSelector(getContactsList);
  const filter = useSelector(getFilter);

  contactsList = getContactsIfFiltered(contactsList, filter);

  const onDeleteBtnClick = id => {
    dispatch(removeContact(id));
  };

  const mapCallback = ({ name, number, id }) => (
    <ContactsItem key={id}>
      {name} {number}
      <ContactsButton onClick={() => onDeleteBtnClick(id)}>
        Delete
      </ContactsButton>
    </ContactsItem>
  );

  return (
    <ContactsListStyled>{contactsList.map(mapCallback)}</ContactsListStyled>
  );
};

export default ContactsList;
