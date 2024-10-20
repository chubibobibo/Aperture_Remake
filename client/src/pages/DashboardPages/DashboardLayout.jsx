import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData, Outlet } from "react-router-dom";
import { createContext } from "react";

/** @loader obtains logged user data then pass it to the context*/
export const loader = async () => {
  try {
    const loggedUser = await axios.get("/api/auth/getLoggedUser");
    return loggedUser;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    // return redirect("/login");
    return err;
  }
};

export const Context = createContext();

/** @userData props passed to @NavbarDesktop containing the data from loader function */
function DashboardLayout() {
  const data = useLoaderData();

  return (
    <Context.Provider value={data}>
      <Outlet />
    </Context.Provider>
  );
}
export default DashboardLayout;
