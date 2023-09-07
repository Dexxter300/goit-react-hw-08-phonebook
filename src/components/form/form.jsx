import { useState } from 'react';
import React from 'react';
import css from './form.module.css';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';
import { nanoid } from 'nanoid';
import { setFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
  // state = {
  //   name: '',
  //   number: '',
  // };

  const [addContact] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();

  let addContactCheck = null;

  const handleSubmit = async (e, name, number) => {
    try {
      e.preventDefault();
      const contactChecker = normilizeContact(e, name, number);
      if (addContactCheck) {
        await addContact(contactChecker);
      }
      dispatch(setFilter(''));
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const normilizeContact = () => {
    if (
      contacts.filter(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      ).length !== 0
    ) {
      addContactCheck = false;
      alert(`${name} is already in your contacts`);
      return;
    }
    addContactCheck = true;
    const newContact = { name: name, number: number, id: nanoid() };
    return newContact;
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePhoneChange = e => {
    setNumber(e.target.value);
  };

  return (
    <>
      <form className={css.form} onSubmit={e => handleSubmit(e, name, number)}>
        <label className={css.formLabel}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            pattern="^^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={handleNameChange}
            required
          />
        </label>
        <label className={css.formLabel}>
          Phone number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={handlePhoneChange}
            required
          />
        </label>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};
