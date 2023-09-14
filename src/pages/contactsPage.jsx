import { Form } from 'components/form/form';
import { Filter } from 'components/filter/filter';
import { List } from 'components/list/list';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import css from './contactsPage.module.css';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';

const ContactsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleFilter = e => {
    const correctFilter = e.target.value.toLowerCase();
    // console.log(correctFilter);
    dispatch(setFilter(correctFilter));
    // console.log(filter);
    if (correctFilter === '') {
      // setFilteredList([]);
      return;
    }
    // renderFilter();
  };

  return (
    <div
      className={css.container}
      // style={{
      //   paddingLeft: '20px',
      // }}
    >
      <div className={css.parts}>
        <h1 className={css.title}>Phonebook</h1>
        <Form></Form>
      </div>
      <div className={css.parts}>
        <h2 className={css.title}>Contacts</h2>
        <Filter handleFilter={handleFilter}></Filter>
        <List></List>
      </div>
    </div>
  );
};

export default ContactsPage;
