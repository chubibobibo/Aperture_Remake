import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/Context.js";
import { useUserContext } from "../hooks/useUserContext.js";
// import { UserContext } from "../pages/HomeLayout";

function NavList() {
  /** @logoutUser onClick event to logout user */
  const logoutUser = async () => {
    try {
      await axios.post("/api/auth/logout");
      toast.success("User successfully logged out");
      return redirect("/dashboard/index");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      return err;
    }
  };

  // const userData = useContext(UserContext);
  const userData = useUserContext();
  const loggedUser = userData?.data?.foundLoggedUser;
  // console.log(userData);
  const isLoggedIn = userData?.data?.message !== "No logged user";

  const navigate = useNavigate();
  const onClickToProfile = () => {
    navigate(`/update-user/${loggedUser._id}`);
  };
  const onClickToLogin = () => {
    navigate("/login");
  };

  return (
    <ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-md'
      >
        <a
          href='/dashboard/index'
          className='flex items-center hover:text-blue-500 transition-colors'
        >
          HOME
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-md'
      >
        <a
          href=''
          className='flex items-center hover:text-blue-500 transition-colors'
          onClick={isLoggedIn ? onClickToProfile : onClickToLogin}
        >
          PROFILE
        </a>
      </Typography>
      {isLoggedIn && (
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 text-md'
        >
          <a
            href='/dashboard/create-post'
            className='flex items-center hover:text-blue-500 transition-colors'
          >
            CREATE POST
          </a>
        </Typography>
      )}

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-md'
      >
        <a
          href='#'
          className='flex items-center hover:text-blue-500 transition-colors'
        >
          SEARCH USER
        </a>
      </Typography>
      {isLoggedIn ? (
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 text-md'
        >
          <a
            href='#'
            className='flex items-center hover:text-blue-500 transition-colors'
            onClick={logoutUser}
          >
            LOGOUT
          </a>
        </Typography>
      ) : (
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 text-md'
        >
          <a
            href='/login'
            className='flex items-center hover:text-blue-500 transition-colors'
          >
            LOGIN
          </a>
        </Typography>
      )}
    </ul>
  );
}
export default NavList;
