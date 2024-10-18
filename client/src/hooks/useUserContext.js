import { useContext } from "react";
import { ExpressError } from "../../../server/errorHandler/ExpressError.js";
import { UserContext } from "../context/Context.js";

/** UserContext obtains data of logged user and is wrapped in the HomeLayout component */

export const useUserContext = () => {
  const userData = useContext(UserContext);
  if (userData === undefined) {
    throw new ExpressError("No Data", 400);
  }
  return userData;
};
