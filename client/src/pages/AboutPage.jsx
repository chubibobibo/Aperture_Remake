import { Typography } from "@material-tailwind/react";

function AboutPage() {
  console.log("Alistair");
  return (
    <section className='grid grid-cols-1 grid-rows-1 place-items-center h-fit mb-10'>
      <div className='mt-8'>
        <div className='flex flex-col items-center mb-10 md:mb-24'>
          <Typography variant='h6' className='md:text-3xl mb-6'>
            About Aperture
          </Typography>
          <Typography className='text-xs px-10 md:text-base lg:w-[50rem]'>
            Welcome to Aperture, a photo-sharing platform designed for
            photographers, adventurers, and explorers to showcase their best
            shots and discover amazing locations for photography. I created this
            app to share my love for street photography and to find like-minded
            people who are passionate about exploring and sharing unique places
            for photography. Whether you're an aspiring photographer or just
            someone who loves to capture stunning moments, this platform
            connects you with a community of individuals who share your passion
            for discovering and sharing unique photography spots.
          </Typography>
        </div>
        {/** second grid */}
        <div className='grid grid-cols-2 px-2 mb-10 md:mb-24'>
          <div className='flex flex-col items-center justify-center'>
            <Typography variant='h6' className='md:text-3xl mb-6'>
              What We Do
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              At Aperture, we believe that every photo has a story and every
              place has its own unique beauty. That’s why we’ve built a space
              where users can upload their favorite photos and tag them with the
              exact location where they were taken. This way, users not only
              share their art but also offer guidance and inspiration for others
              who want to explore these amazing spots.
            </Typography>
          </div>
          <div className='flex place-content-center md:justify-center'>
            <img
              src='/street-15.jpg'
              alt=''
              className='md:w-[40rem] md:h-[30rem] object-cover'
            />
          </div>
        </div>
        {/** third grid */}
        <div className='grid grid-cols-2 px-2 mb-10 md:mb-24'>
          <div className='flex flex-col items-center justify-center'>
            <img
              src='/street-16.jpg'
              alt=''
              className='md:w-[40rem] md:h-[30rem] object-cover'
            />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <Typography variant='h6' className='md:text-3xl mb-6'>
              Key Features
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Upload and Share: Share your stunning photos with the world and
              showcase the locations where they were taken.
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Interactive Map: Discover new photography spots by browsing the
              map. Click on photo markers to learn more about the location and
              details of the photo.
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Photo Ratings and Comments: Engage with the community by leaving
              comments and ratings on photos shared by others. Get feedback and
              share your own thoughts on their photography.
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Explore the Best Locations: With user-uploaded photos tagged by
              location, you'll have access to a growing map of incredible spots
              around the world, making it easier to find the best locations for
              your next shoot.
            </Typography>
          </div>
        </div>
        {/** fourth grid */}
        <div className='grid grid-cols-2 px-2 mb-10 md:mb-24'>
          <div className='flex flex-col items-center justify-center'>
            <Typography variant='h6' className='md:text-3xl mb-6'>
              Why Aperture
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Community-Driven: The app thrives on contributions from
              photographers of all skill levels, making it a dynamic and
              ever-growing source of inspiration.
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Discover Hidden Gems: From iconic landmarks to hidden gems,
              explore new places through the lens of fellow photographers.
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-1 md:text-base lg:w-[50rem] max-w-[30rem]'
            >
              - Feedback & Growth: Get constructive feedback on your photos and
              engage in conversations with other users to grow your skills.
            </Typography>
          </div>
          <div className='flex items-center place-content-center'>
            {/* <Typography variant='h6'>IMAGE</Typography> */}
            <img
              src='/street-14.jpg'
              alt=''
              className='md:w-[40rem] md:h-[30rem] object-cover'
            />
          </div>
        </div>
        {/**fifth grid */}
        <div className='mb-12'>
          <div className='flex flex-col justify-center items-center'>
            <Typography variant='h6' className='md:text-3xl mb-2'>
              Join Us Today!
            </Typography>
            <Typography
              // variant='h6'
              className='text-xs px-2 md:text-base lg:w-[50rem] max-w-[40rem]'
            >
              Start sharing your photography journey and be part of a community
              that celebrates the art of capturing beautiful moments. Discover
              new photography spots, interact with other photographers, and
              showcase your work on a global stage.
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutPage;
