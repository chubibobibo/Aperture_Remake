import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData, Outlet } from "react-router-dom";
import { createContext } from "react";

/** @loader obtains logged user data then pass it to the context*/
// export const loader = async () => {
//   try {
//     const loggedUser = await axios.get("/api/auth/getLoggedUser");
//     return loggedUser;
//   } catch (err) {
//     console.log(err);
//     toast.error(err?.response?.data?.message);
//     // return redirect("/login");
//     return err;
//   }
// };

/** @userData props passed to @NavbarDesktop containing the data from loader function */
function DashboardLayout() {
  // const data = useLoaderData();

  return (
    <>
      <Outlet />
    </>
  );
}
export default DashboardLayout;
