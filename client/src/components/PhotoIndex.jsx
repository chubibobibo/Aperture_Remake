// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import PhotosContext from "../context/PhotoContext";

import UserAvatar from "./UserAvatar";
import { usePhotoContext } from "../hooks/usePhotoContext";

function PhotoIndex() {
  /** Obtain data from contexts */
  // const photoData = useContext(PhotosContext);
  // const photos = photoData?.data?.allPhotos;
  /** @usePhotoContext custom hook that uses useContext to obtain data from PhotosContext */
  const photoData = usePhotoContext();
  const photos = photoData.data.allPhotos;
  const navigate = useNavigate();
  console.log(photos);

  /** @handleClickNav onClick event handler to navigate to specific post */
  const handleClickNav = (postId) => {
    navigate(`/dashboard/post/${postId}`);
  };

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
      {photos.map((newData) => {
        console.log(newData);
        return (
          <div key={newData._id} className='flex mt-4 flex-col'>
            <UserAvatar newData={newData} />
            <img
              className='h-auto max-w-full rounded-lg object-cover object-center'
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
  );
}
export default PhotoIndex;
