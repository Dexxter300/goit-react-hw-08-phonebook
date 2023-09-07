import { useSelector } from 'react-redux';
import css from './filter.module.css';

export const Filter = ({ handleFilter }) => {
  const filter = useSelector(state => state.filter.filter);

  // useEffect(() => {
  //   setFilteredList(prevState => {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter)
  //     );
  //   });
  // }, [filter, contacts]);

  return (
    <div className={css.filter}>
      <label className={css.filterLabel}>
        Find contact by name
        <input
          className={css.filterInput}
          type="text"
          name="filter"
          value={filter}
          pattern="^^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="find contact"
          onChange={handleFilter}
        />
      </label>
    </div>
  );
};
