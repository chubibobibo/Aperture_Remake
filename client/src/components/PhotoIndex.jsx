// import { useContext } from "react";
import { useNavigate, redirect, Link } from "react-router-dom";
// import PhotosContext from "../context/PhotoContext";

import UserAvatar from "./UserAvatar";
import { usePhotoContext } from "../hooks/usePhotoContext";
import { Typography } from "@material-tailwind/react";
import { toCapitalize } from "../utils/toCaptialize";

import PropTypes from "prop-types";

function PhotoIndex() {
  /** Obtain data from contexts */
  // const photoData = useContext(PhotosContext);
  // const photos = photoData?.data?.allPhotos;
  /** @usePhotoContext custom hook that uses useContext to obtain data from PhotosContext */
  const photoData = usePhotoContext();
  const photos = photoData.data.allPhotos;
  const navigate = useNavigate();
  // console.log(photos);

  /** @handleClickNav onClick event handler to navigate to specific post */
  const handleClickNav = (postId) => {
    navigate(`/dashboard/post/${postId}`);
  };

  return (
    <masonry-layout gap={100}>
      <section className='md:w-screen md:flex md:justify-center'>
        {photos.length === 0 ? (
          <Typography variant='h6' className='mt-12 md:text-2xl'>
            Soooo quiet in here. Create a post
          </Typography>
        ) : (
          <div className='grid grid-cols-2 gap-3 mt-1 md:grid-cols-3 w-full md:w-11/12 md:mt-10'>
            {photos.map((newData) => {
              // console.log(newData);
              return (
                <div key={newData._id} className='flex mt-4 flex-col gap-1'>
                  <UserAvatar newData={newData} />
                  <img
                    className='object-cover h-[10rem] w-[10rem] sm:h-[15rem] sm:w-[20rem] xl:h-[27rem] xl:w-full'
                    src={newData.photoUrl}
                    alt='gallery-photo'
                    loading='lazy'
                    onClick={() => {
                      handleClickNav(newData._id);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </masonry-layout>
  );
}
export default PhotoIndex;

{
  /* <section className='md:w-screen md:flex md:justify-center'>
  {photos.length === 0 ? (
    <Typography variant='h6' className='mt-12 md:text-2xl'>
      Soooo quiet in here. Create a post
    </Typography>
  ) : (
    <div className='grid grid-cols-2 gap-3 mt-1 md:grid-cols-3 md:w-11/12 md:mt-10'>
      {photos.map((newData) => {
        // console.log(newData);
        return (
          <div key={newData._id} className='flex mt-4 flex-col gap-1'>
            <UserAvatar newData={newData} />
            <img
              className='h-auto max-w-full rounded-lg object-cover object-center cursor-pointer'
              src={newData.photoUrl}
              alt='gallery-photo'
              loading='lazy'
              onClick={() => {
                handleClickNav(newData._id);
              }}
            />
          </div>
        );
      })}
    </div>
  )}
</section>; */
}

// h-auto max-w-full rounded-lg object-center cursor-pointer mb-2 max-h-[6rem] object-cover xs:max-h-[9rem] sm:max-h-[10rem] md:max-w-full md:max-h-[9rem] xl:max-h-[13rem]
