import css from './list.module.css';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
  // useGetContactsByNameQuery,
} from '../../redux/contactsSlice';
import { ListItem } from 'components/listItem/listItem';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { useState } from 'react';

export const List = () => {
  // console.log(contacts);
  const filter = useSelector(state => state.filter.filter);
  const { data: contacts, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [filteredList, setFilteredList] = useState([]);
  // const { data: filteredContacts, isLoading: isLoadingForName } =
  // useGetContactsByNameQuery(filter);

  useEffect(() => {
    if (!isLoading) {
      setFilteredList(prevState => {
        return contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter)
        );
      });
    }
  }, [filter, contacts, isLoading]);

  const handleDelete = async id => {
    try {
      await deleteContact(id);
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
