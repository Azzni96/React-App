import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/ContextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();
  useEffect(() => {
    if (!user) {
      try {
        handleAutoLogin();
      } catch (e) {
        console.error((e as Error).message);
      }
    }
  }, []);
  return (
    <>
      <h2>My APP</h2>
      <div>
        <nav>
          <ul className='list-none m-0 p-0  justify-end bg-stone-600 flex'>
            <li>
              <Link className='block p-4 text-center hover:bg-stone-800' to="/">Home</Link >
            </li>
            {user ?(
              <>
            <li>
              <Link className='block p-4 text-center hover:bg-stone-800' to="/profile">Profile</Link >
            </li>
            <li>
              <Link className='block p-4 text-center hover:bg-stone-800' to="/upload">Upload</Link >
            </li>
            <li>
              <Link className='block p-4 text-center hover:bg-stone-800' to="/Logout">Logout</Link >
            </li>
            <li>
                      <Link className='block p-4 text-center hover:bg-stone-800' to="/Example">Example</Link >
              </li>
            </>

            ): (
              <>
              <li>
              <Link className='block p-4 text-center hover:bg-stone-800' to="/login">Login</Link >
              </li>
              <li>
                <Link className='block p-4 text-center hover:bg-stone-800' to="/register">Register</Link >
              </li>
              </>
          )}


          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
