import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";

// import { useContext } from "react";
// import { UserContext } from "../context/Context.js";
// import { UserContext } from "../pages/HomeLayout";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import NavList from "./NavList";
import { useUserContext } from "../hooks/useUserContext.js";
import { Link } from "react-router-dom";

function NavbarDesktop() {
  /** @openNav state that handles the display of compact and full navbar */
  const [openNav, setOpenNav] = useState(false);
  /** @handleWindowResize from material tailwind navbar hiding*/
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  /** @userData data from context in DashboardLayout */
  // const userData = useContext(UserContext);
  const userData = useUserContext();
  console.log(userData);

  /** @userName logged user's name from the props @userData */
  const userName = userData?.data?.foundLoggedUser?.username;

  return (
    <Navbar className='mx-auto max-w-screen-3xl px-6 py-3 mt-0 sticky '>
      <div className='flex items-center justify-around text-blue-gray-900 2xl:px-44'>
        <div className='hidden lg:block'>
          <NavList />
        </div>
        <IconButton
          variant='text'
          className='h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className='h-6 w-6' strokeWidth={2} />
          ) : (
            <Bars3Icon className='h-6 w-6' strokeWidth={2} />
          )}
        </IconButton>
        <Typography
          as='a'
          href={
            !userData.data.foundLoggedUser
              ? "/login"
              : `/profile/${userData?.data?.foundLoggedUser?._id}`
          }
          variant='h6'
          className='cursor-pointer py-1.5 sm-max:ml-auto md:ml-auto 2xl:ml-auto'
        >
          {userData?.data?.message === "No logged user"
            ? "User"
            : userName.charAt(0).toUpperCase() + userName.slice(1)}
        </Typography>
        <Link
          to={
            !userData.data.foundLoggedUser
              ? "/login"
              : `/profile/${userData?.data?.foundLoggedUser?._id}`
          }
        >
          <img
            src={
              userData?.data?.message === "No logged user" ||
              userData?.data?.foundLoggedUser?.avatarUrl === undefined
                ? "/Aperture1.png"
                : userData?.data?.foundLoggedUser?.avatarUrl
            }
            alt='avatar picture'
            className='w-12 h-12 rounded-full ml-2 mr-2'
          />
          {/* <img
            src={
              !userData.data.foundLoggedUser ||
              userData?.data?.foundLoggedUser?.avatarUrl === undefined
                ? "/Aperture1.png"
                : userData?.data?.foundLoggedUser?.avatarUrl
            }
            alt='avatar picture'
            className='w-12 h-12 rounded-full ml-2 mr-2'
          /> */}
        </Link>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default NavbarDesktop;
