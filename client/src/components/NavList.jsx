import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/Context.js";
import { useUserContext } from "../hooks/useUserContext.js";
// import { UserContext } from "../pages/HomeLayout";

function NavList() {
  const navigate = useNavigate();
  /** @logoutUser onClick event to logout user */
  const logoutUser = async () => {
    try {
      await axios.post("/api/auth/logout");
      toast.success("User successfully logged out");
      // navigate("/dashboard/home");
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
  // console.log(isLoggedIn);

  const onClickToProfile = () => {
    navigate(`/profile/${loggedUser._id}`);
  };

  const onClickToAccount = () => {
    navigate(`/update-user/${loggedUser?._id}`);
  };

  const onClickToLogin = () => {
    navigate("/login");
    toast.error("User needs to be logged in");
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
          href='/dashboard/home'
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
        onClick={isLoggedIn ? onClickToProfile : onClickToLogin}
      >
        <a
          href={isLoggedIn ? `/profile/${loggedUser?._id}` : "/login"}
          className='flex items-center hover:text-blue-500 transition-colors'
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
          href={isLoggedIn ? `/update-user/${loggedUser?._id}` : "/login"}
          className='flex items-center hover:text-blue-500 transition-colors'
          onClick={isLoggedIn ? onClickToAccount : onClickToLogin}
        >
          ACCOUNT
        </a>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-md'
      >
        <a
          href='/dashboard/about'
          className='flex items-center hover:text-blue-500 transition-colors'
          // onClick={isLoggedIn ? onClickToAccount : onClickToLogin}
        >
          ABOUT US
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
            href='/dashboard/home'
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

      {!isLoggedIn && (
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 text-md'
        >
          <a
            href='/register'
            className='flex items-center hover:text-blue-500 transition-colors'
          >
            REGISTER
          </a>
        </Typography>
      )}
    </ul>
  );
}
export default NavList;
