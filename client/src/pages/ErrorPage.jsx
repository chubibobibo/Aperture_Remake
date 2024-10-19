import { Typography, Button } from "@material-tailwind/react";
import { useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);
  /** @navToHome function used as an onClick event to navigate */
  const navToHome = () => {
    navigate("/dashboard/home");
  };

  if (error.status === 404) {
    return (
      <figure className='flex justify-center flex-col items-center sm:mt-16 md:-mt-5'>
        <Typography
          variant='small'
          className='mt-10 text-center font-normal text-5xl md:text-8xl'
        >
          404
        </Typography>
        <Typography
          variant='small'
          className='mt-2 text-center px-2 text-md font-normal  sm:text-lg md:text-3xl'
        >
          Sorry we couldn't find the page you are looking for.
        </Typography>
        <Typography
          variant='small'
          className='mt-2 text-center px-2 font-normal mb-1 sm:text-lg md:text-2xl'
        >
          It appears that the page you are looking for does not exist.
        </Typography>
        <img
          className='h-64 w-64 rounded-lg object-cover object-center md:h-80 md:w-80'
          src='/public/error.png'
          alt='page not found image'
        />
        <Button className='w-48 mt-1' onClick={navToHome}>
          GO BACK TO HOME
        </Button>
      </figure>
    );
  }

  return (
    <figure className='flex justify-center flex-col items-center sm:mt-22 md:mt-10'>
      <Typography
        variant='small'
        className='mt-2 text-center px-2 text-md font-normal  sm:text-lg md:text-3xl'
      >
        Ooooppsss. Something went wrong
      </Typography>
      <Typography
        variant='small'
        className='mt-2 text-center px-2 font-normal mb-1 sm:text-lg md:text-2xl'
      >
        There seems to be some problem.
      </Typography>
      {/* <Typography
        variant='small'
        className='mt-2 text-center px-2 font-normal mb-1 sm:text-lg md:text-2xl'
      >
        {error.stack}
      </Typography> */}
      <img
        className='h-64 w-64 rounded-lg object-cover object-center md:h-80 md:w-80'
        src='/public/error1.png'
        alt='page not found image'
      />
      <Button className='w-48 mt-1' onClick={navToHome}>
        GO BACK TO HOME
      </Button>
    </figure>
  );
}
export default ErrorPage;
