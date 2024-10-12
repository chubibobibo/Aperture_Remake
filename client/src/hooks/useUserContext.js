import { useContext } from "react";
import { ExpressError } from "../../../server/errorHandler/ExpressError";
import { UserContext } from "../context/Context";

export const useUserContext = () => {
  const userData = useContext(UserContext);
  if (userData === undefined) {
    throw new ExpressError("No Data", 400);
  }
  return userData;
};
