import { selectIsLoggedIn } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './home.module.css';

const Home = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Contacts manager welcome page 💁‍♀️</h1>
      {isLoggedIn ? (
        // <div className={css.contactsBtn}>
        <Link className={css.contactsBtn} to="/contacts">
          Go to contacts
        </Link>
      ) : (
        // </div>
        <>
          <ul className={css.list}>
            <li>
              <Link className={css.listLink} to="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className={css.listLink} to="/login">
                Login
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
