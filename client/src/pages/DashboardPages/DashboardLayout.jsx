import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

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

function DashboardLayout() {
  const data = useLoaderData();
  console.log(data);
  return <>DashboardLayout</>;
}
export default DashboardLayout;
