import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getContactsList, getFilter } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';

import Loader from 'components/Loader/Loader';
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
  let { contacts, isLoading, error } = useSelector(getContactsList);
  const filter = useSelector(getFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  contacts = getContactsIfFiltered(contacts, filter);

  const onDeleteBtnClick = id => {
    dispatch(deleteContact(id));
  };

  const mapCallback = ({ name, phone, id }) => (
    <ContactsItem key={id}>
      {name}
      <br />
      {phone}
      <ContactsButton onClick={() => onDeleteBtnClick(id)}>
        Delete
      </ContactsButton>
    </ContactsItem>
  );

  return (
    <ContactsListStyled>
      {isLoading && <Loader />}
      {!isLoading && !error && contacts.map(mapCallback)}
    </ContactsListStyled>
  );
};

export default ContactsList;
