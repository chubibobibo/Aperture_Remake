/** LEAFLET MAP */
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles.css";
import { Icon, divIcon, point } from "leaflet";
import mockData from "../../jsonData/data.json";
import PhotoIndex from "../../components/PhotoIndex";
import MarkerClusterGroup from "react-leaflet-cluster";

function IndexPage() {
  /** @custmoMapIcon new instance of Icon from leaflet that will apply a custom made pins in the map */
  const customMapIcon = new Icon({
    iconUrl: "../../src/assets/location.png",
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

  /** @Marker component determines the position and the icon to be used for the markers */
  /** @MarkerClusterGroup wraps around the marker to cluster them when map is zoomed out */
  return (
    <div className='flex flex-col justify-center items-center'>
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={10}
        scrollWheelZoom={true}
        className='h-52 w-11/12 flex justify-center items-center rounded-lg mt-2 md:h-72'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/** @chunkedLoading allows react to  render the markers one at a time to improve performance*/}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {mockData.map((newData) => {
            return (
              <Marker
                position={newData.location}
                icon={customMapIcon}
                key={newData.id}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      <section className='m-3'>
        <PhotoIndex />
      </section>
    </div>
  );
}
export default IndexPage;
