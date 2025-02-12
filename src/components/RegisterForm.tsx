import { useEffect, useState } from "react";
import {useUser} from "../hooks/apiHooks";
import {useForm} from "../hooks/formHooks";
import {RegisterCredentials} from "../types/LocalTypes";

const RegisterForm = () => {
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getEmailAvailable, getUsernameAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doLogin result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const mainemail = async () => {
      try{
        if (inputs.email.length > 2) {
          const result = await getEmailAvailable(inputs.email)
           setEmailAvailable(result.available!)
        } else {
          setEmailAvailable(true)
        }

      }catch(e){
        console.error((e as Error).message);
        setEmailAvailable(true)
      }

    }
   mainemail()
  }, [inputs.email, getEmailAvailable])
  useEffect(() => {
    const mainname = async () => {
      try{
        if(inputs.username){
        const result = await getUsernameAvailable(inputs.username)
        setUsernameAvailable(result.available!)
        } else {
          setUsernameAvailable(true)
        }

      }catch(e){
        console.error((e as Error).message);
        setUsernameAvailable(true)
      }
    }
    mainname()
  }, [inputs.username, getUsernameAvailable])

  return (
    <>
      <h1 className="text-center ">Register</h1>
      <form  className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <div className='flex flex-col w-[80%]'>
          <label htmlFor="regusername">Username</label>
          <input className="p-[10px] border-[1px] rounded-[5px] "
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
          {!usernameAvailable && (
            <p className="text-right text-red-500">Username not available</p>
          )}
          {usernameAvailable == true &&(
            <p className="text-right text-green-500">Username available</p>
          )}
        </div>
        <div className='flex flex-col w-[80%]'>
          <label htmlFor="regpassword">Password</label>
          <input className="p-[10px] border-[1px] rounded-[5px] "
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <div className='flex flex-col w-[80%]'>
          <label htmlFor="regemail">Email</label>
          <input className="p-[10px] border-[1px] rounded-[5px] "
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
          {!emailAvailable && (
            <p className="text-right text-red-500">Email not available</p>
          )}
          {emailAvailable == true  &&(
            <p className="text-right text-green-500">Email available</p>
          )}
        </div>
        <button className='my-[10px] p-[10px] rounded-[5px] bg-stone-500 cursor-pointer hover:bg-stone-950 hover:text-white ' type="submit">Register</button>
      </form>
    </>
  );

};

export default RegisterForm;
