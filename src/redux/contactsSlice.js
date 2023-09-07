import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const contactsInitialState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];
const contactsInitialState = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContacts(state, action) {
      //   state.push(action.payload);
      state.contacts = [...state.contacts, action.payload];
    },
    deleteContacs(state, action) {
      //   const filteredContacts = state.filter(
      //     contact => contact.id !== action.payload
      //   );
      //   state = filteredContacts;
      state.contacts = state.contacts.filter(el => el.id !== action.payload);
    },
  },
});

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '//64f0f4bb8a8b66ecf77a48e5.mockapi.io',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contact => ({
        url: `/contacts/${contact}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    // getContactsByName: builder.query({
    //   query: name => `/contacts/${name}`,
    //   providesTags: ['Contacts'],
    // }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  // useGetContactsByNameQuery,
} = contactsApi;
export const { addContacts, deleteContacs } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
