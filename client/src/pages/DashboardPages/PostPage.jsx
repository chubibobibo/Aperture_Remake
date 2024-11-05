import UserAvatar from "../../components/UserAvatar";
import UserAvatarComments from "../../components/UserAvatarComments";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@material-tailwind/react";
import { toCapitalize } from "../../utils/toCaptialize";

import { Link, useLoaderData } from "react-router-dom";
import UpdateCommentModal from "../../components/UpdateCommentModal";

import ReactStars from "react-stars";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import AddCommentModal from "../../components/AddCommentModal";
import DeletePostModal from "../../components/DeletePostModal";

import { FaLocationDot } from "react-icons/fa6";
import { PiNotepadFill } from "react-icons/pi";
import { PiSubtitlesFill } from "react-icons/pi";

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
  // console.log(data);
  const photoData = data?.photoData?.data?.foundPhoto;
  const loggedUser = data?.isLoggedUser?.data?.foundLoggedUser;
  // console.log(photoData);
  // console.log(loggedUser);

  /** @isPostOwner logic for dynamically rendering the button to delete */
  const isPostOwner =
    photoData?.createdBy?._id === loggedUser?._id ||
    loggedUser?.role === "admin";

  return (
    /** Displays the photo and the user details that posted it */
    <section className='w-full p-4 flex flex-col justify-center items-center mt-4 gap-2 md:w-screen md:gap-2 md:items-center'>
      {/* <div className='flex justify-start md:w-[45rem]'> */}
      <div className='w-[100%] flex md:w-[45rem] md:flex md:justify-start'>
        <UserAvatar newData={photoData} />
        {isPostOwner && (
          <div className='ml-auto md:ml-auto'>
            <DeletePostModal photoData={photoData._id} />
          </div>
        )}
      </div>
      <div className='flex justify-start w-full md:w-[45rem]'>
        <Typography className='flex gap-2 text-sm md:text-lg'>
          {/* <span className='font-bold'>Title:</span>{" "} */}
          <PiSubtitlesFill size={25} />
          {toCapitalize(photoData.title)}
        </Typography>
      </div>
      <div className='md:mb-2 md:w-[45rem] md:flex md:justify-center'>
        <img
          src={photoData.photoUrl}
          alt='post photo'
          className='max-h-[20rem] md:max-h-[40rem]'
        />
      </div>
      {/** Description and location */}
      <div className='flex flex-col gap-2 md:items-center'>
        <div className='w-fit min-w-[18rem] p-2 border-2 rounded-md border-gray-500 mb-4 md:w-[45rem]'>
          <Typography className='flex gap-2 text-sm mb-0 p-2 md:mb-4 md:text-lg md:font-bold md:w-[45rem]'>
            <FaLocationDot size={25} />
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
          <Typography className='flex gap-2 text-sm mb-1 p-2 md:mb-4 md:text-lg  md:w-[45rem]'>
            <PiNotepadFill size={25} /> {photoData.description}
          </Typography>
        </div>
        {/** @AddCommentModal modal for adding comments. passes the logged user details */}
        <AddCommentModal loggedUser={loggedUser} photoData={photoData} />
      </div>
      {photoData.comment.length === 0 ? (
        <div className='mt-6'>
          <Typography>
            Wow! it's empty here. Be the first to leave a comment
          </Typography>
        </div>
      ) : (
        <>
          {/** Displays the comments by mapping */}
          {photoData.comment.map((allComments) => {
            // console.log(allComments);
            const isAuthor =
              loggedUser?._id === allComments?.author?._id ||
              loggedUser?.role === "admin";
            return (
              <section
                key={allComments._id}
                className='mb-2 w-full md:flex md:flex-col md:items-center md:w-[90%]'
              >
                <div className='grid grid-cols-3 grid-rows-1 gap-12 mt-4 h-[10rem] border-2 border-gray-400 rounded-lg md:w-[90%] md:h-[10rem] lg:w-[50rem] overflow-y-scroll '>
                  <div className='flex p-2 font-bold cursor-pointer col-span-1 min-w-[10rem] mt-2'>
                    <UserAvatarComments newData={allComments} />
                  </div>
                  <div className='flex flex-col justify-center col-span-2 p-2 ml-4'>
                    <ReactStars
                      size={30}
                      value={allComments?.rating} //default value
                      color2={"#ffd700"}
                      half={false}
                      edit={false} //allows changing of rate
                    />
                    <p className='text-sm md:text-base h-[5rem] md:h-[5rem]'>
                      {allComments.body}
                    </p>
                  </div>
                </div>

                {/** dynamically renders the buttons depending if user is the author of the comment */}
                {isAuthor && (
                  <div className='flex gap-1 p-1 md:w-[100%] md:justify-star lg:w-[50rem]'>
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
        </>
      )}
    </section>
  );
}
export default PostPage;
