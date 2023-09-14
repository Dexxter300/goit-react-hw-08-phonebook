// import React, { useState } from 'react';
// import { nanoid } from 'nanoid';

// import { addContacts, deleteContacs } from 'redux/contactsSlice';
// import { setFilter } from 'redux/filterSlice';
// import { getFilter, getContacts } from 'redux/selectors';
// import { useDispatch } from 'react-redux';
// import { useGetContactsQuery } from 'redux/contactsSlice';

// import { Form } from './form/form';
// import { List } from './list/list';
// import { Filter } from './filter/filter';
// import { Nav } from '../components/nav/nav';
// import { ContactsPage } from '../pages/contactsPage';
import { Route, Routes } from 'react-router-dom';
// import { Home } from '../pages/home';
// import { RegisterForm } from '../pages/registerForm';
// import { LoginForm } from '../pages/loginForm';
import { RestrictedRoute } from './restrictedRoute';
import { PrivateRoute } from './privateRoute';
import { refreshUser } from 'redux/auth/operations';
import { useAuth } from 'hooks';
import { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from './Layout';

export const App = () => {
  // const [contacts, setContacts] = useState([
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ]);
  // const [filter, setFilter] = useState('');
  // const [filteredList, setFilteredList] = useState([]);

  // const filter = useSelector(state => state.filter.filter);
  // const contacts = useSelector(state => state.contacts.contacts);
  // const { contacts, error, isLoading } = useGetContactsQuery();

  // useEffect(() => {
  //   setFilteredList(prevState => {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter)
  //     );
  //   });
  // }, [filter, contacts]);

  // const handleSubmit = (e, name, number) => {
  //   e.preventDefault();
  //   if (
  //     contacts.filter(
  //       contact => contact.name.toLowerCase() === name.toLowerCase()
  //     ).length !== 0
  //   ) {
  //     alert(`${name} is already in your contacts`);
  //     return;
  //   }
  // const newContact = { name: name, number: number, id: nanoid() };
  // // console.log(newContact);
  // // setContacts(prevState => {
  // //   return [...prevState, { name: name, number: number, id: nanoid() }];
  // // });
  // dispatch(setFilter(''));
  // // console.log(newContact);
  // dispatch(addContacts(newContact));
  // setFilter('');
  // console.log(contacts);

  // e.target.reset();
  // };

  // const handleFilter = e => {
  //   const correctFilter = e.target.value.toLowerCase();
  //   // console.log(correctFilter);
  //   dispatch(setFilter(correctFilter));
  //   // console.log(filter);
  //   if (correctFilter === '') {
  //     // setFilteredList([]);
  //     return;
  //   }
  //   // renderFilter();
  // };

  // const renderFilter = () => {
  //   // console.log(filter);
  //   setFilteredList(prevState => {
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter)
  //     );
  //   });
  //   // return filteredList;
  // };

  // const deleteContact = contactId => {
  //   // setContacts(prevState =>
  //   //   prevState.filter(contact => contact.id !== contactId)
  //   // );
  //   dispatch(deleteContacs(contactId));
  // };

  const Home = lazy(() => import('./pages/home'));
  const ContactsPage = lazy(() => import('./pages/contactsPage'));
  const RegisterForm = lazy(() => import('./pages/registerForm'));
  const LoginForm = lazy(() => import('./pages/loginForm'));

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p
      style={{
        backgroundColor: '#0e0e0e',
        height: '100vh',
        backgroundSize: 'cover',
        margin: 0,
        // color: '#aeaeb4',
      }}
    >
      Refreshing user...
    </p>
  ) : (
    // <div
    //   style={{
    //     paddingLeft: '20px',
    //   }}
    // >
    //   <h1>Phonebook</h1>
    //   <Form></Form>
    //   <h2>Contacts</h2>
    //   <Filter handleFilter={handleFilter}></Filter>
    //   <List
    //   ></List>
    // </div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/" component={<RegisterForm />} />
          }
        />
        <Route
          path="login"
          element={<RestrictedRoute redirectTo="/" component={<LoginForm />} />}
        />
      </Route>
    </Routes>
  );
};
