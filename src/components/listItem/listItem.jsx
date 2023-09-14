import css from './listItem.module.css';
// import { useDispatch } from 'react-redux';

export const ListItem = ({ contact, handleDelete }) => {
  // const dispatch = useDispatch();

  //   const handleDelete = async id => {
  //     try {
  //       await dispatch(deleteContact(id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };
  // console.log(contact);
  return (
    <>
      <li className={css.listItem}>
        <span className={css.contactText}>
          {contact.name}: {contact.number}
        </span>
        <button
          className={css.itemBtn}
          type="button"
          onClick={() => handleDelete(contact.id)}
        >
          delete
        </button>
      </li>
    </>
  );
};
