import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const contactsInitialState = {
  contactsList: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        const { contactsList } = state;
        contactsList.push(action.payload);
      },

      prepare(payload) {
        return {
          payload: {
            ...payload,
            id: nanoid(),
          },
        };
      },
    },

    // Accepts a payload with contact id
    // Checks whether the id from action matches the id in our ContactList
    // Returns a new list wtihout matched id.
    removeContact: (state, action) => {
      const { contactsList } = state;
      const { payload } = action;

      const filteredContacts = contactsList.filter(({ id }) => {
        return id !== payload;
      });

      state.contactsList = [...filteredContacts];
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, removeContact } = contactsSlice.actions;
