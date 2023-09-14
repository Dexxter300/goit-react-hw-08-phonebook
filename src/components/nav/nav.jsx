import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { useAuth } from 'hooks';
import { useDispatch } from 'react-redux';
import { logOut } from 'redux/auth/operations';
import css from './nav.module.css';

export const Nav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <>
      <div className={css.container}>
        <ul className={css.list}>
          <li>
            <NavLink className={css.link} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.link} to="/contacts">
              Contacts
            </NavLink>
          </li>
        </ul>
        {!isLoggedIn ? (
          <ul className={css.list}>
            <li>
              <NavLink className={css.link} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className={css.link} to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        ) : (
          <div className={css.list}>
            <p className={css.userData}>Welcome, {user.name}</p>
            <button
              className={css.logoutBtn}
              type="button"
              onClick={() => dispatch(logOut())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
