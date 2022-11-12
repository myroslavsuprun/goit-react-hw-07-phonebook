import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/contactsSlice';

import {
  AddContactWrapper,
  Form,
  FormLabel,
  FormInput,
  FormButtonSubmit,
} from './AddContactFrom.styled';
import { getContactsList } from 'redux/selectors';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const nameInputId = nanoid();
const numberInputId = nanoid();

function AddContactForm() {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [number, setNumber] = useState(INITIAL_STATE.number);
  const dispatch = useDispatch();
  const { contactsList } = useSelector(getContactsList);

  const handleSubmit = e => {
    e.preventDefault();

    const foundContact = contactsList.find(contactFromGlobalState => {
      const nameFromGlobalState = contactFromGlobalState.name.toLowerCase();
      return nameFromGlobalState === name.toLowerCase();
    });

    if (foundContact) {
      reset();
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));

    reset();
  };

  const handleChange = e => {
    const { name: inputName, value: inputValue } = e.target;

    switch (inputName) {
      case 'name':
        setName(inputValue);
        break;
      case 'number':
        setNumber(inputValue);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName(INITIAL_STATE.name);
    setNumber(INITIAL_STATE.number);
  };

  return (
    <AddContactWrapper>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor={nameInputId}>
          Name
          <FormInput
            type="text"
            name="name"
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nameInputId}
            value={name}
            onChange={handleChange}
          />
        </FormLabel>
        <FormLabel htmlFor={numberInputId}>
          Number
          <FormInput
            type="tel"
            name="number"
            placeholder="Enter phone number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={numberInputId}
            value={number}
            onChange={handleChange}
          />
        </FormLabel>
        <FormButtonSubmit>Add {name}</FormButtonSubmit>
      </Form>
    </AddContactWrapper>
  );
}

export default AddContactForm;
