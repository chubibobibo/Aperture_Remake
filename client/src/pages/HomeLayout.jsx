import axios from "axios";
import { Outlet, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
// import { createContext } from "react";
import NavbarDesktop from "../components/NavbarDesktop";

import { UserContext } from "../context/Context.js";

/** LOADER FUNCTION TO OBTAIN  logged user*/
export const loader = async () => {
  try {
    const loggedUser = await axios.get("/api/auth/getLoggedUser");
    return loggedUser;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function HomeLayout() {
  const userData = useLoaderData();
  // console.log(userData);
  return (
    <>
      <UserContext.Provider value={userData}>
        {/* <NavbarDesktop /> */}
        <Outlet />
      </UserContext.Provider>
    </>
  );
}
export default HomeLayout;
