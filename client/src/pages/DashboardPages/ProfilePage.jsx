import axios from "axios";
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
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { toCapitalize } from "../../utils/toCaptialize";

function ProfilePage() {
  /**  @userData contains loggeduser data from the context in HomeLayout*/
  const userData = useUserContext();
  const foundUser = userData?.data?.foundLoggedUser;

  const navigate = useNavigate();

  /** @handleClickNav onClick event handler to navigate to specific post */
  const handleClickNav = (postId) => {
    navigate(`/dashboard/post/${postId}`);
  };

  console.log(userData);

  /** @getUserPhoto function use to retieve the photo of logged user */
  const getUserPhoto = async () => {
    try {
      const foundUserPhoto = await axios(
        `/api/photo/userPhoto/${foundUser._id}`
      );
      return foundUserPhoto;
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    }
  };

  /** @useQuery fetches data using the @getUserPhoto function */
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["photoData"],
    queryFn: getUserPhoto,
  });

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  /** @photoData array of images of logged user coming from @useQuery */
  const photoData = data?.data?.foundUserPhoto;

  return (
    <section className='flex flex-col items-center mt-10'>
      <Card className='w-11/12 mb-4'>
        <div className='h-30 flex justify-center'>
          <img
            src={foundUser.avatarUrl}
            alt='avatar photo'
            className='rounded-full w-[6rem] h-[6rem] md:w-[10rem] md:h-[10rem]'
          />
        </div>
        <CardBody className='text-center'>
          <Typography className='font-bold mt-2' variant='h5' color='black'>
            {foundUser.username.toUpperCase()}
          </Typography>
          <Typography color='blue-gray' className='font-medium' textGradient>
            CEO / Co-Founder
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
        {photoData.length === 0 ? (
          <div className='flex justify-center'>
            <Typography className='mt-10 mb-10 px-3' variant='h6'>
              You don't have any posts yet.
            </Typography>
          </div>
        ) : (
          <div className='grid grid-cols-2 gap-4 md:grid-cols-3 mb-8 p-2'>
            {photoData.map((newData) => {
              console.log(newData);
              return (
                <div
                  key={newData._id}
                  className='flex mt-4 flex-col items-center'
                >
                  <img
                    className='h-auto max-w-full rounded-lg object-cover object-center cursor-pointer'
                    src={newData.photoUrl}
                    alt='gallery-photo'
                    loading='lazy'
                    onClick={() => {
                      handleClickNav(newData._id);
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
  );
}
export default ProfilePage;
