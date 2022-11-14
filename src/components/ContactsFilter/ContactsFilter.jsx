import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import { selectFilter } from 'redux/selectors';
import { updateFilter } from 'redux/filterSlice';

import { FormLabel, FormInput } from './ContactsFilter.styled';

const filterInputId = nanoid();

const ContactsFilter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onInputChange = e => {
    let currentValue = e.target.value;
    dispatch(updateFilter(currentValue));
  };

  return (
    <FormLabel key={filterInputId}>
      Find contacts by name
      <FormInput
        value={filter}
        type="text"
        name="filter"
        id={filterInputId}
        onChange={onInputChange}
      />
    </FormLabel>
  );
};

export default ContactsFilter;
