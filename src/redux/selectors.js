import { createSelector } from '@reduxjs/toolkit';

export const selectContatcsList = state => state.contacts;

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContatcsList, selectFilter],
  ({ contacts }, filter) => {
    if (filter === '') {
      return contacts;
    }

    return contacts.filter(contact => {
      const contactName = contact.name.toLowerCase();
      return contactName.includes(filter.toLowerCase());
    });
  }
);
