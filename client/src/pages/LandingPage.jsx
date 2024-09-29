import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  /** @handleNavigateRegister event handler to navigate to the register page*/
  const handleNavigateRegister = () => {
    navigate("/register");
  };
  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <section
      className='w-screen h-screen bg-cover bg-center bg-blend-luminosity flex justify-center items-center'
      style={{ backgroundImage: "url(../src/assets/Landing_mobile.jpg)" }}
    >
      <Card className='w-68 bg-transparent m-2 sm:m-4 md:w-3/4 lg:w-2/4 xl:w-2/4'>
        <CardBody className='flex flex-col items-center'>
          <div>
            <img
              className='h-40 w-full object-cover object-center bg-transparent'
              src='../src/assets/Aperture1.png'
              alt='site logo'
            />
          </div>
          <Typography
            variant='h3'
            className='mb-1 font-lato text-logoBlack-50 font'
          >
            APERTURE
          </Typography>
          <Typography
            variant='h5'
            className='mb-2 text-sm font-lato text-logoBlack-50 font  sm:text-lg'
          >
            Capture. Share. Inspire.
          </Typography>

          <Typography className='font-lato font text-xs text-landingGray-50 sm:text-sm md:max-lg:text-lg'>
            Welcome to Aperture, where your moments become part of a global
            gallery. Whether you're a seasoned photographer or a passionate
            hobbyist, this is the place to showcase your creativity, connect
            with a like-minded community, and find inspiration from others.
            Share your photos with the world and discover stunning visuals —all
            in one place. Start sharing your perspective today and join a
            community where every photo tells a story. Join us and start
            creating!
          </Typography>
        </CardBody>
        <CardFooter className='pt-0 flex gap-2 justify-center items-center flex-col'>
          <Button className='w-44 bg-landingGray-50 sm:max-lg:bg-red-60'>
            Explore the app
          </Button>
          <Button
            className='w-44 bg-landingGray-50 sm:max-lg:bg-red-60'
            onClick={handleNavigateRegister}
          >
            Register
          </Button>
          <Button
            className='w-44 bg-landingGray-50 sm:max-md:bg-red'
            onClick={handleNavigateLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
export default LandingPage;
