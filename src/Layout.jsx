import { Nav } from 'components/nav/nav';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './layout.module.css';
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <Nav />
      </header>
      <main className={css.main}>
        <Suspense fallback={<div>hui</div>}>
          <Outlet />
        </Suspense>
        <Toaster
          position="top-right"
          reverseOrder={false}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </main>
    </>
  );
};
// style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}
