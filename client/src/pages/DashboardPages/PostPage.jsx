import UserAvatar from "../../components/UserAvatar";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

import { Link, useLoaderData } from "react-router-dom";

/** @loader function to obtain single photo */
/** @params obtains id from the params in the url */
export const loader = async ({ params }) => {
  console.log(params.id);
  try {
    const photoData = await axios.get(`/api/photo/post/${params.id}`);
    return photoData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

/** @newData props that is needed by UserAvatar to display user info. Since the photo contains createdBy which is populated with userData, we can use it to display the author of the photo */
function PostPage() {
  const data = useLoaderData();
  const photoData = data?.data?.foundPhoto;
  console.log(photoData);
  return (
    <section className='max-w-xl flex flex-col justify-center m-4 mt-10 gap-2'>
      <UserAvatar newData={photoData} />
      <img src={photoData.photoUrl} alt='' />
      <div className='flex gap-16 w-screen'>
        <Typography>
          Location:{" "}
          <Link
            // to={`https://www.google.com/maps/search/?api=1&${photoData.photoLocation}`}
            to={`https://www.google.com/maps/search/?api=1&query= +
        ${photoData.photoCoords[1]} +
        , +
       ${photoData.photoCoords[0]}`}
            className='text-blue-600'
          >
            {photoData.photoLocation}
          </Link>
        </Typography>
        <Typography>Rating:</Typography>
      </div>
      <div className='grid-rows-1 grid-cols-2 mt-4'>
        <div className='w-[20rem] h-[8rem] border-2 border-gray-400 rounded-xl '>
          <p>hello</p>
        </div>
      </div>
    </section>
  );
}
export default PostPage;
