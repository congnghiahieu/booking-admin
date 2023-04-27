import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <section className='layout'>
      <Header />
      <section className='content'>
        <Sidebar />
        <div className='page'>
          <Outlet />
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Layout;
