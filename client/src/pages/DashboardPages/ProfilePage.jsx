import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import { useUserContext } from "../../hooks/useUserContext";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toCapitalize } from "../../utils/toCaptialize";

/** loader function to retreive user and photo data */
/** @userData user id linked from clicking user avatars */
/** @photoData obtaining the users photos  */
export const loader = async ({ params }) => {
  try {
    const userData = await axios.get(`/api/auth/getUser/${params.id}`);
    console.log(userData);
    const user = userData?.data?.foundUser?._id;
    const photoData = await axios.get(`/api/photo/userPhoto/${user}`);
    console.log(photoData);
    return { userData, photoData };
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

/** @loggedUser logged user using params from navbar */
/** @data userData from avatar links and their photoData */
function ProfilePage() {
  const navigate = useNavigate();
  const loggedUser = useUserContext();
  console.log(loggedUser);
  const data = useLoaderData();

  /** @userData @photoData data from the results of loader function */
  const userData = data?.userData?.data?.foundUser;
  const photoData = data?.photoData?.data?.foundUserPhoto;
  console.log(data);

  /** @handleClickNav onClick event handler to navigate to specific post */
  const handleClickNav = (postId) => {
    navigate(`/dashboard/post/${postId}`);
  };

  return (
    <section className='flex flex-col items-center mt-10'>
      <Card className='w-11/12 mb-4'>
        <div className='h-30 flex justify-center'>
          <img
            src={userData?.avatarUrl}
            alt='avatar photo'
            className='rounded-full w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem]'
          />
        </div>
        <CardBody className='text-center'>
          <Typography className='font-bold mt-2' variant='h5' color='black'>
            {userData?.username?.toUpperCase()}
          </Typography>
        </CardBody>
        <CardFooter className='flex justify-center gap-7 pt-2 border-b-4'>
          <Tooltip content='Like'>
            <Link to='https://facebook.com'>
              <FaFacebook color='blue' size={25} />
            </Link>
          </Tooltip>
          <Tooltip content='Follow'>
            <Link to='https://twitter.com'>
              <FaTwitter color='lightBlue' size={25} />
            </Link>
          </Tooltip>
          <Tooltip content='Follow'>
            <Link to='https://instagram.com'>
              <FaInstagram color='purple' size={25} />
            </Link>
          </Tooltip>
        </CardFooter>
        {/** PHOTO GRID */}
        {photoData?.length === 0 ? (
          <div className='flex justify-center'>
            <Typography className='mt-10 mb-10 px-3' variant='h6'>
              You don't have any posts yet.
            </Typography>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 mb-8 p-2'>
            {photoData?.map((newData) => {
              console.log(newData);
              return (
                <div
                  key={newData?._id}
                  className='flex mt-4 flex-col items-center'
                >
                  <img
                    className='object-cover h-[10rem] w-[10rem] sm:h-[15rem] sm:w-[20rem] xl:h-[27rem] xl:w-full cursor-pointer'
                    src={newData?.photoUrl}
                    alt='gallery-photo'
                    loading='lazy'
                    onClick={() => {
                      handleClickNav(newData?._id);
                    }}
                  />
                  <Typography className='text-xs md:text-base'>
                    {toCapitalize(newData?.title)}
                  </Typography>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </section>
    // <></>
  );
}
export default ProfilePage;
