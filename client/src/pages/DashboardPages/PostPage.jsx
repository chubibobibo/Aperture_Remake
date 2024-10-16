import UserAvatar from "../../components/UserAvatar";
import UserAvatarComments from "../../components/UserAvatarComments";
import { toast } from "react-toastify";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

import { Link, useLoaderData } from "react-router-dom";
import UpdateCommentModal from "../../components/UpdateCommentModal";

import ReactStars from "react-stars";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import AddCommentModal from "../../components/AddCommentModal";

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
    <section className='w-fit flex flex-col justify-center items-center m-4 mt-10 gap-2 md:w-screen md:gap-2 md:items-center'>
      <div className='w-[100%] md:w-[45rem] md:m-1 md:flex md:justify-start'>
        <UserAvatar newData={photoData} />
      </div>
      <div className='md:mb-2 md:w-[45rem] md:m-1'>
        <img src={photoData.photoUrl} alt='' />
      </div>
      <div className='flex flex-col gap-2 md:items-center'>
        {/** provides the link of the location of the photo */}
        <Typography className='mb-1 md:mb-4 md:text-lg md:font-bold'>
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
        {/** @AddCommentModal modal for adding comments. passes the logged user details */}
        <AddCommentModal loggedUser={loggedUser} photoData={photoData} />
      </div>
      {photoData.comment.length === 0 ? (
        <>
          <Typography>
            Wow! it's empty here. Be the first to leave a comment
          </Typography>
        </>
      ) : (
        <>
          {/** Displays the comments by mapping */}
          {photoData.comment.map((allComments) => {
            // console.log(allComments);
            const isAuthor = loggedUser?._id === allComments?.author?._id;
            return (
              <section
                key={allComments._id}
                className='mb-2 w-full md:flex md:flex-col md:items-center md:w-[90%]'
              >
                <div className='grid grid-cols-3 grid-rows-1 mt-4 h-[10rem] border-2 border-gray-400 rounded-lg md:w-[90%] md:h-[10rem] lg:w-[50rem] overflow-y-scroll '>
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
