import { useContext } from "react";
import { PhotosContext } from "../context/Context.js";
import { ExpressError } from "../../../server/errorHandler/ExpressError.js";

export const usePhotoContext = () => {
  const photoData = useContext(PhotosContext);
  if (photoData === undefined) {
    throw new ExpressError("NO data", 404);
  }
  return photoData;
};
