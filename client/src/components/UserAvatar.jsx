import { toCapitalize } from "../utils/toCaptialize.js";

/** @newData props containing mapped userData for each photo from PhotoIndex.jsx */
function UserAvatar({ newData }) {
  //   console.log(newData);
  /** @toCapitalize function to capitalize texts */
  return (
    <div>
      <div className='flex gap-1 items-center mb-1'>
        <div>
          <img
            src={newData.createdBy.avatarUrl}
            alt=''
            className='w-8 h-8 rounded-3xl'
          />
        </div>
        <div className='text-md font-bold'>
          <p>{toCapitalize(newData.createdBy.username)}</p>
        </div>
      </div>
    </div>
  );
}
export default UserAvatar;
