import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import css from './loginForn.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Login</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLabel}>
          <span className={css.inputTitle}> Email</span>
          <input className={css.formInput} type="text" name="email" />
        </label>
        <label className={css.formLabel}>
          <span className={css.inputTitle}>Password</span>
          <input className={css.formInput} type="text" name="password" />
        </label>
        <button className={css.formBtn} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
