import { toCapitalize } from "../utils/toCaptialize.js";
import { Link } from "react-router-dom";

/** @newData props containing mapped userData for each photo from PhotoIndex.jsx */
function UserAvatar({ newData }) {
  console.log(newData);
  /** @toCapitalize function to capitalize texts */

  return (
    <div>
      <Link to={`/profile/${newData.createdBy._id}`}>
        <div className='flex gap-1 items-center mb-1'>
          <div>
            <img
              src={
                newData.createdBy.avatarUrl
                  ? newData?.createdBy?.avatarUrl
                  : "/Aperture1.png"
              }
              alt=''
              className='w-8 h-8 rounded-3xl object-cover'
            />
          </div>
          <div className='text-sm font-bold md:text-base'>
            <p>{toCapitalize(newData?.createdBy?.username)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default UserAvatar;
