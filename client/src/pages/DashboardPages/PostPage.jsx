import UserAvatar from "../../components/UserAvatar";
import UserAvatarComments from "../../components/UserAvatarComments";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import { Link, useLoaderData } from "react-router-dom";

/** @loader function to obtain single photo and logged user returns both the photo data and the logged user */
/** @params obtains id from the params in the url */
export const loader = async ({ params }) => {
  console.log(params.id);
  try {
    const photoData = await axios.get(`/api/photo/post/${params.id}`);
    const isLoggedUser = await axios.get("/api/auth/getLoggedUser");
    return { photoData, isLoggedUser };
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

/** @newData props that is needed by UserAvatar to display user info. Since the photo contains createdBy which is populated with userData, we can use it to display the author of the photo */
function PostPage() {
  const data = useLoaderData();
  console.log(data);
  const photoData = data?.photoData?.data?.foundPhoto;
  const loggedUser = data?.isLoggedUser?.data?.foundLoggedUser;
  // console.log(photoData);
  return (
    <section className='max-w-xl flex flex-col justify-center m-4 mt-10 gap-2'>
      <UserAvatar newData={photoData} />
      <img src={photoData.photoUrl} alt='' />
      <div className='flex flex-col'>
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
        {loggedUser && <Button>Add Comment</Button>}
      </div>
      {photoData.comment.map((allComments) => {
        console.log(allComments);
        return (
          <section key={allComments._id} className='mb-2'>
            <div className='grid grid-cols-3 grid-rows-1 mt-4 w-[20rem] h-1/6 border-2 border-gray-400 rounded-xl'>
              <div className='flex p-2 font-bold cursor-pointer col-span-1'>
                <UserAvatarComments newData={allComments} />
              </div>
              <div className='flex flex-col justify-center col-span-2 p-2'>
                <p className='font-bold '>Rating: {allComments.rating}</p>
                <p>{allComments.body}</p>
              </div>
            </div>
            {loggedUser?._id === allComments?.author?._id && (
              <div className='flex gap-1 p-1'>
                <Button color='amber' size='sm'>
                  Update
                </Button>
                <Button color='red' size='sm'>
                  Delete
                </Button>
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}
export default PostPage;
