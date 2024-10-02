import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData, redirect } from "react-router-dom";
import NavbarDesktop from "../../components/NavbarDesktop";

export const loader = async () => {
  try {
    const loggedUser = await axios.get("/api/auth/getLoggedUser");
    return loggedUser;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    // return redirect("/login");
    return null;
  }
};

/** @userData props passed to @NavbarDesktop containing the data from loader function */
function DashboardLayout() {
  const data = useLoaderData();

  return (
    <>
      <NavbarDesktop userData={data} />
    </>
  );
}
export default DashboardLayout;
