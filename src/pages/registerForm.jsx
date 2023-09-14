import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import css from './registerForm.module.css';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Register</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.formLabel}>
          <span className={css.inputTitle}>Name</span>
          <input className={css.formInput} type="text" name="name" />
        </label>
        <label className={css.formLabel}>
          <span className={css.inputTitle}>Email</span>
          <input className={css.formInput} type="email" name="email" />
        </label>
        <label className={css.formLabel}>
          <span className={css.inputTitle}>Password</span>
          <input className={css.formInput} type="password" name="password" />
        </label>
        <button className={css.formBtn} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
