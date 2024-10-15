import UserAvatar from "../../components/UserAvatar";
import UserAvatarComments from "../../components/UserAvatarComments";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import { Link, useLoaderData, Form } from "react-router-dom";
import UpdateCommentModal from "../../components/UpdateCommentModal";

import ReactStars from "react-stars";
import DeleteCommentModal from "../../components/DeleteCommentModal";

/** @loader function to obtain single photo and logged user returns both the photo data and the logged user */
/** @params obtains id from the params in the url */
export const loader = async ({ params }) => {
  // console.log(params.id);
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

/** @PostPage  page that will be rendered to display the specific photo*/
/** @newData props that is needed by UserAvatar to display user info. Since the photo contains createdBy which is populated with userData, we can use it to display the author of the photo */

function PostPage() {
  const data = useLoaderData();
  console.log(data);
  const photoData = data?.photoData?.data?.foundPhoto;
  const loggedUser = data?.isLoggedUser?.data?.foundLoggedUser;
  // console.log(photoData);

  return (
    /** Displays the photo and the user details that posted it */
    <section className='max-w-xl flex flex-col justify-center m-4 mt-10 gap-2'>
      <UserAvatar newData={photoData} />
      <img src={photoData.photoUrl} alt='' />
      <div className='flex flex-col'>
        {/** provides the link of the location of the photo */}
        <Typography>
          Location:{" "}
          <Link
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
      {/** Displays the comments */}
      {photoData.comment.map((allComments) => {
        // console.log(allComments);
        const isAuthor = loggedUser?._id === allComments?.author?._id;
        return (
          <section key={allComments._id} className='mb-2 w-full'>
            <div className='grid grid-cols-3 grid-rows-1 mt-4 h-1/6 border-2 border-gray-400 rounded-xl'>
              <div className='flex p-2 font-bold cursor-pointer col-span-1'>
                <UserAvatarComments newData={allComments} />
              </div>
              <div className='flex flex-col justify-center col-span-2 p-2'>
                <ReactStars
                  size={30}
                  value={allComments?.rating} //default value
                  color2={"#ffd700"}
                  half={false}
                  edit={false} //allows changing of rate
                />
                <p>{allComments.body}</p>
              </div>
            </div>
            {/** dynamically renders the buttons depending if user is the author of the comment */}

            {isAuthor && (
              <div className='flex gap-1 p-1'>
                <UpdateCommentModal
                  singleComment={allComments?._id}
                  photoData={photoData._id}
                />

                <DeleteCommentModal
                  photoDataId={photoData._id}
                  commentDataId={allComments._id}
                />
              </div>
            )}
          </section>
        );
      })}
    </section>
  );
}
export default PostPage;
