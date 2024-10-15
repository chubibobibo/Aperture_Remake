import { useContext } from "react";
import { ExpressError } from "../../../server/errorHandler/ExpressError.js";
import { UserContext } from "../context/Context.js";

export const useUserContext = () => {
  const userData = useContext(UserContext);
  if (userData === undefined) {
    throw new ExpressError("No Data", 400);
  }
  return userData;
};
