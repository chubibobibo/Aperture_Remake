import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Form, redirect } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
import { useNavigation } from "react-router-dom";

/** @action function that will obtain data from the forms using @formData and send it to the create post API */
/** Instead of transforming the formData inot an object using fromEntries(), we are going to let multer convert it. */
/** @photoUrl name of the input that sends the photo file */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("photoUrl");

  if (file && file.size > 50000000) {
    toast.error("file is too large");
  }

  try {
    await axios.post("/api/photo/createPost", formData);
    toast.success("New post created");
    return redirect("/dashboard/index");
  } catch (err) {
    console.log(err);
    toast.error(
      Array.isArray(err?.response?.data?.message)
        ? err?.response?.data?.message[0]
        : err?.response?.data?.message
    );
    return err;
  }
};

function CreatePost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className='flex justify-center'>
      <Card className='mt-6 w-11/12 mx-2'>
        <Form method='post' encType='multipart/form-data'>
          <CardBody className='flex flex-col items-center gap-3'>
            <Typography variant='h5' color='blue-gray' className='mb-2'>
              CREATE NEW POST
            </Typography>
            {/* <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to &quot;Naviglio&quot; where you can enjoy the main
            night life in Barcelona.
          </Typography> */}

            <div className='w-72'>
              <Input label='Title of Post' name='title' />
            </div>
            <div className='w-72'>
              <Input label='Upload photo' type='file' name='photoUrl' />
            </div>
            <div className='w-72'>
              <Textarea label='Description of your photo' name='description' />
            </div>
          </CardBody>
          <CardFooter className='pt-0'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "SUBMITTING POST..." : "CREATE POST"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </section>
  );
}
export default CreatePost;
