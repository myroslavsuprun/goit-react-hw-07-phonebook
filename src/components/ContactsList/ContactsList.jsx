import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectContatcsList, selectFilteredContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import Contact from 'components/Contact/Contact';
import Loader from 'components/Loader/Loader';
import { ContactsListStyled } from './ContactsList.styled';

const ContactsList = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { error } = useSelector(selectContatcsList);
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contacts.length !== 0) {
      setIsInitialLoading(false);
    }
  }, [contacts]);

  const mapCallback = ({ name, phone, id }) => (
    <Contact name={name} phone={phone} id={id} key={id} />
  );

  return (
    <ContactsListStyled>
      {error && <p>{error}</p>}
      {isInitialLoading && <Loader />}
      {!isInitialLoading && !error && contacts.map(mapCallback)}
    </ContactsListStyled>
  );
};

export default ContactsList;
