

import { useUserContext } from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1 className="text-center">Login</h1>
      <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-col w-[80%]'>
          <label htmlFor="loginusername">Username</label>
          <input className='p-[10px] border-[1px] rounded-[5px] '
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div className='flex flex-col w-[80%]'>
          <label htmlFor="loginpassword">Password</label>
          <input className='p-[10px] border-[1px] rounded-[5px] '
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button className="bg-stone-700 px-4 py-2 text-white hover:bg-stone-600 sm:px-8 sm:py-3" type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
