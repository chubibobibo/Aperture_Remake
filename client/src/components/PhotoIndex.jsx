import mockData from "../jsonData/data.json";

import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { PhotosContext } from "../pages/DashboardPages/IndexPage";
import { Context } from "../pages/DashboardPages/DashboardLayout";
import { toCapitalize } from "../utils/toCaptialize";

function PhotoIndex() {
  /** Obtain data from contexts */
  const photoData = useContext(PhotosContext);
  const photos = photoData?.data?.allPhotos;
  console.log(photos);

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
      {photos.map((newData) => {
        // console.log(newData);
        return (
          <div key={newData._id} className='flex mt-4 flex-col'>
            <div className='flex gap-1 items-center mb-1'>
              <div>
                <img
                  src={newData.createdBy.avatarUrl}
                  alt=''
                  className='w-8 h-8 rounded-2xl'
                />
              </div>
              <div className='text-sm'>
                <p>{toCapitalize(newData.createdBy.username)}</p>
              </div>
            </div>
            <img
              className='h-auto max-w-full rounded-lg object-cover object-center'
              src={newData.photoUrl}
              alt='gallery-photo'
              loading='lazy'
            />
          </div>
        );
      })}
    </div>
  );
}
export default PhotoIndex;
