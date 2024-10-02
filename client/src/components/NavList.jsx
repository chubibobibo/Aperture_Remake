import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList() {
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
          LOGOUT
        </a>
      </Typography>
    </ul>
  );
}
export default NavList;
