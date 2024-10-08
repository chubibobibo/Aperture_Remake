import mockData from "../jsonData/data.json";

import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { PhotosContext } from "../pages/DashboardPages/IndexPage";

function PhotoIndex() {
  const photoData = useContext(PhotosContext);
  // console.log(photoData);
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
      {photoData.data.allPhotos.map((newData) => {
        return (
          //   <div className='grid gap-4' key={newData.id}>
          <div key={newData._id} className='flex mt-4'>
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
