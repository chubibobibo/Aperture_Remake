import { toCapitalize } from "../utils/toCaptialize.js";

/** @newData props containing mapped userData for each photo from PhotoIndex.jsx */
function UserAvatarComments({ newData }) {
  //   console.log(newData);
  /** @toCapitalize function to capitalize texts */
  return (
    <div>
      <div className='flex gap-1 items-center mb-1'>
        <div>
          <img
            src={newData?.author?.avatarUrl}
            alt=''
            className='w-8 h-8 rounded-2xl'
          />
        </div>
        <div className='text-md'>
          <p>{toCapitalize(newData?.author?.username)}</p>
        </div>
      </div>
    </div>
  );
}
export default UserAvatarComments;
