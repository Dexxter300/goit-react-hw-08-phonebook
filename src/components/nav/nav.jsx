import { NavLink, Outlet } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';

export const Nav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
        {!isLoggedIn && (
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        )}
      </div>
      <Outlet />
    </>
  );
};
