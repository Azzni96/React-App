import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../src/hooks/ContextHooks';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ?(
              <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/Logout">Logout</Link>
            </li>
            </>
            ): (
              <>
              <li>
              <Link to="/login">Login</Link>
            </li>
                      <li>
                      <Link to="/Example">Example</Link>
                    </li>

                    <li>
                      <Link to="/register">Register</Link>
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
