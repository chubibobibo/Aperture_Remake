import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../pages/DashboardPages/DashboardLayout";

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

  const data = useContext(Context);
  const isLoggedIn = data?.data?.message !== "No logged user";

  return (
    <ul className='my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-lg'
      >
        <a
          href='#'
          className='flex items-center hover:text-blue-500 transition-colors'
        >
          HOME
        </a>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 text-lg'
      >
        <a
          href='#'
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
          className='p-1 text-lg'
        >
          <a
            href='/dashboard/createPost'
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
        className='p-1 text-lg'
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
          className='p-1 text-lg'
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
          className='p-1 text-lg'
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
