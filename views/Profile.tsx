import { useEffect, useState } from "react";
import { useUser } from "../src/hooks/apiHooks";
import { UserWithNoPassword} from "hybrid-types/DBTypes";



const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null >(null);
  const {getUserByToken} = useUser();


  useEffect(
    () => {
      getUser();
    }, []
  )
  const getUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
    const userResponse = await getUserByToken(token);
    setUser(userResponse.user);
  }
  };

  return (
    <>
      <h2 className=" text-center mt-5 p-0">Profile</h2>
      {user &&(
      <>
      <p className="text-center mt-3">
        {user.username} ({user.email})
      </p>
      <p className="text-center mt-3">
        User level : {user.level_name}
        </p>
      <p className="text-center mt-3">
        Registered:
        {new Date(user.created_at).toLocaleString('fi-FI')}
        </p>
      </>
     )}

   </>
  )
};
export default Profile;
