import { Form } from 'components/form/form';
import { Filter } from 'components/filter/filter';
import { List } from 'components/list/list';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const ContactsPage = () => {
  const dispatch = useDispatch();

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
      style={{
        paddingLeft: '20px',
      }}
    >
      <h1>Phonebook</h1>
      <Form></Form>
      <h2>Contacts</h2>
      <Filter handleFilter={handleFilter}></Filter>
      <List></List>
    </div>
  );
};
