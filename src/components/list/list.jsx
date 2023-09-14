import css from './list.module.css';
import { ListItem } from 'components/listItem/listItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { selectAllContacts, selectLoading } from 'redux/contacts/selectors';
import { deleteContact } from 'redux/contacts/operations';
import { useDispatch } from 'react-redux';

export const List = () => {
  // console.log(contacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
  // const { data: contacts, isLoading } = useGetContactsQuery();
  // const [deleteContact] = useDeleteContactMutation();
  const [filteredList, setFilteredList] = useState([]);
  // const { data: filteredContacts, isLoading: isLoadingForName } =
  // useGetContactsByNameQuery(filter);
  const isLoading = useSelector(selectLoading);
  const contacts = useSelector(selectAllContacts);

  useEffect(() => {
    if (!isLoading) {
      setFilteredList(prevState => {
        return contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter)
        );
      });
    }
    // dispatch(fetchContacts);
  }, [filter, contacts, isLoading]);

  const handleDelete = async id => {
    try {
      await dispatch(deleteContact(id));
    } catch (error) {
      console.log(error);
    }
  };

  // if (filter !== '') {
  //   return (
  //     <>
  //       {!isLoadingForName && (
  //         <ul className={css.list}>
  //           {filteredContacts.map(contact => {
  //             return (
  //               <ListItem
  //                 contact={contact}
  //                 handleDelete={handleDelete}
  //                 key={contact.id}
  //               ></ListItem>
  //             );
  //           })}
  //         </ul>
  //       )}
  //     </>
  //   );
  // }

  // console.log(contacts);
  // console.log(error);
  // console.log(isLoading);

  return (
    <>
      {!isLoading && (
        <ul className={css.list}>
          {(contacts && filteredList).map(contact => {
            return (
              <ListItem
                contact={contact}
                handleDelete={handleDelete}
                key={contact.id}
              ></ListItem>
            );
          })}
        </ul>
      )}
    </>
  );
};
