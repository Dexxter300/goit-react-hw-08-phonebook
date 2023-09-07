import css from './listItem.module.css';

export const ListItem = ({ contact, handleDelete }) => {
  return (
    <>
      <li className={css.listItem}>
        <span className={css.contactText}>
          {contact.name}: {contact.phone}
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
