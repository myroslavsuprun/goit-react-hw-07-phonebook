import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectContatcsList, selectFilteredContacts } from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';

import Loader from 'components/Loader/Loader';
import {
  ContactsListStyled,
  ContactsItem,
  ContactsButton,
} from './ContactsList.styled';

const ContactsList = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(selectContatcsList);
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && !error && contacts.map(mapCallback)}
    </ContactsListStyled>
  );
};

export default ContactsList;
