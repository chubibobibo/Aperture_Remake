import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/photo/deletePost/${params.id}`);
    toast.success("Post successfully deleted");
    return redirect("/dashboard/index");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DeletePostPage() {
  return <>DeletePostPage</>;
}

export default DeletePostPage;
