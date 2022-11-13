import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const onPending = state => {
  state.isLoading = true;
};

const onRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    // Fetch contacts reducers
    builder.addCase(fetchContacts.pending, onPending);
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    });
    builder.addCase(fetchContacts.rejected, onRejected);

    // Delete contact reducers
    builder.addCase(deleteContact.pending, onPending);
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.contacts.findIndex(contact => {
        return contact.id === action.payload.id;
      });
      state.contacts.splice(index, 1);
    });
    builder.addCase(deleteContact.rejected, onRejected);

    // Add contact reducers
    builder.addCase(addContact.pending, onPending);
    builder.addCase(addContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.contacts.push(action.payload);
    });
    builder.addCase(addContact.rejected, onRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
