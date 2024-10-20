import UserAvatar from "./UserAvatar";
import { Typography } from "@material-tailwind/react";

function PhotoComponent({ photos, handleClickNav }) {
  return (
    <section className='md:w-screen md:flex md:justify-center'>
      {photos?.length === 0 ? (
        <Typography variant='h6' className='mt-12 md:text-2xl'>
          Soooo quiet in here. Create a post
        </Typography>
      ) : (
        <div className='grid grid-cols-2 gap-3 mt-1 md:grid-cols-3 w-full md:w-11/12 md:mt-10'>
          {photos?.map((newData) => {
            // console.log(newData);
            return (
              <div key={newData?._id} className='flex mt-4 flex-col gap-1'>
                <UserAvatar newData={newData} />
                <img
                  className='object-cover h-[10rem] w-[10rem] sm:h-[15rem] sm:w-[20rem] xl:h-[27rem] xl:w-full'
                  src={newData?.photoUrl}
                  alt='gallery-photo'
                  loading='lazy'
                  onClick={() => {
                    handleClickNav(newData?._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
export default PhotoComponent;
