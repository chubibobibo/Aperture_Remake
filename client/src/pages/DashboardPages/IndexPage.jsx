/** LEAFLET MAP */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { PhotosContext } from "../../context/Context.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext.js";

import { toast } from "react-toastify";
import axios from "axios";
// import { lazy, Suspense } from "react";
// import Loading from "../../components/Loading.jsx";

import { toCapitalize } from "../../utils/toCaptialize";
import { Typography, Button } from "@material-tailwind/react";
import PhotoIndex from "../../components/PhotoIndex.jsx";

// const PhotoIndex = lazy(() => import("../../components/PhotoIndex.jsx"));

/** @loader function to obtain all photos using getAllphotos endpoint */
export const loader = async () => {
  try {
    const imageData = await axios.get("/api/photo/allPhotos");
    return imageData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};

/** @PhotosContext shares data from the loader function to the PhotoIndex component */
// export const PhotosContext = createContext();

function IndexPage() {
  /** @photoData contains all photos obtained using loader function */
  const photoData = useLoaderData();
  const data = useUserContext();
  const userData = data?.data?.foundLoggedUser;

  /** function to navigate to create post */
  const navigate = useNavigate();
  const navToCreate = () => {
    navigate("/dashboard/create-post");
  };

  /** @customMapIcon new instance of Icon from leaflet that will apply a custom made pins in the map */
  const customMapIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [38, 38],
  });

  /**  @createClusterCustomIcon function that will create a new instance of the icon for the cluster.*/
  /** @className will be used to style the cluster by using css in the styles.css file */
  const createClusterCustomIcon = function (cluster) {
    return divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  /** @arraySwap function to swap the position of the coordinates in the photoCoords property. This allows leaflet to read the location correctly */
  const arraySwap = (array, a, b) => {
    [array[a], array[b]] = [array[b], array[a]];
    return array;
  };

  /** @Marker component determines the position and the icon to be used for the markers */
  /** @MarkerClusterGroup wraps around the marker to cluster them when map is zoomed out */
  return (
    <div className='flex flex-col justify-center items-center'>
      <section>
        <Typography color='gray' className='mt-8 mb-2 text-sm p-2 md:text-lg'>
          Explore the map, click the pins – uncover the story behind each photo
          and where it was captured.
          {/* <p>Click on the markers to know more about the photos</p> */}
        </Typography>
      </section>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={2}
        scrollWheelZoom={false}
        className='h-52 w-11/12 flex justify-center items-center rounded-lg mt-2 md:h-[30rem]'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/** @chunkedLoading allows react to render the markers one at a time to improve performance*/}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {photoData?.data?.allPhotos?.map((newData) => {
            // console.log(newData);
            /** @orderedCoords using the arraySwap function to swap the places of longitude and latitude in the photoCoords for every iteration of the array */
            const orderedCoords = arraySwap(newData?.photoCoords, 0, 1);
            // console.log(orderedCoords);

            return (
              <Marker
                position={orderedCoords}
                icon={customMapIcon}
                key={newData._id}
              >
                <Popup>
                  <span className='font-bold text-md'>Photo uploaded by: </span>
                  <span className='text-md'>
                    {toCapitalize(newData?.createdBy?.username)}
                  </span>
                  <br />
                  <span className='font-bold text-md'>Title: </span>
                  <span className='text-md'>
                    {toCapitalize(newData?.title)}
                  </span>
                  <br />
                  <span className='font-bold text-md'>Location: </span>
                  <span className='text-md'>
                    {toCapitalize(newData?.photoLocation)}
                  </span>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      {userData && (
        <section className='mt-6'>
          <Button onClick={navToCreate}>Create Post</Button>
        </section>
      )}

      <section className='m-3 -mt-1'>
        <PhotosContext.Provider value={photoData}>
          {/* <Suspense fallback={<Loading />}> */}
          <PhotoIndex />
          {/* </Suspense> */}
        </PhotosContext.Provider>
      </section>
    </div>
  );
}
export default IndexPage;
