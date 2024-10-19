import { toCapitalize } from "../utils/toCaptialize.js";
import { Link } from "react-router-dom";

/** @newData props containing mapped userData for each photo from PhotoIndex.jsx */
function UserAvatarComments({ newData }) {
  // console.log(newData);
  /** @toCapitalize function to capitalize texts */
  return (
    <div>
      <Link to={`/profile/${newData.author._id}`}>
        <div className='flex gap-1 items-center mb-1'>
          <div>
            <img
              src={newData?.author?.avatarUrl}
              alt=''
              className='w-8 h-8 rounded-2xl object-cover'
            />
          </div>
          <div className='text-md'>
            <p>{toCapitalize(newData?.author?.username)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default UserAvatarComments;
