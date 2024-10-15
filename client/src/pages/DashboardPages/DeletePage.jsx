import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import axios from "axios";

/** @action function to delete a specific comment, we will need the id of the specific photo and the specific comment*/
/** @params will contain all the params in the url (in this case we have 2 - photoId and commentId that we specified in the url) */
export const action = async ({ params }) => {
  try {
    await axios.delete(
      `/api/comment/deleteComment/${params.photoId}/${params.commentId}`
    );
    return redirect(`/dashboard/post/${params.photoId}`);
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DeletePage() {
  return <>DeletePage</>;
}
export default DeletePage;
