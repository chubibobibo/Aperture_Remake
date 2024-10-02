import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import NavList from "./NavList";

function NavbarDesktop({ userData }) {
  /** @openNav state that handles the display of compact and full navbar */
  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  console.log(userData);

  return (
    <Navbar className='mx-auto max-w-screen-xl px-6 py-3 mt-2'>
      <div className='flex items-center justify-between text-blue-gray-900'>
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
          href='#'
          variant='h6'
          className='-ml-[] cursor-pointer py-1.5 sm-max:ml-[70%] md:ml-[75%] lg:ml-[55%]'
        >
          {userData?.data?.message === "No logged user"
            ? "User"
            : userData?.data?.foundLoggedUser?.username
                .charAt(0)
                .toUpperCase() +
              userData?.data?.foundLoggedUser?.username.slice(1)}
        </Typography>
        <img
          src='../src/assets/avatar-male.jpg'
          alt='avatar picture'
          className='w-12 h-12 rounded-full'
        />
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
export default NavbarDesktop;
