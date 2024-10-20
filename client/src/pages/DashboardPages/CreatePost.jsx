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

/** @mapbox_api API key stored in env file */
const mapbox_api = import.meta.env.VITE_MAPBOX;

/** @action function that will obtain data from the forms using @formData and send it to the create post API */
/** Instead of transforming the formData inot an object using fromEntries(), we are going to let multer convert it. */
/** @formData input data in the forms. We used .get and .append methods to acquire or modify it's values */
/** @photoUrl name of the input that sends the photo file */
/** @loc obtaining the photoLocation property which contains the location on photo in TEXT */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("photoUrl");
  const loc = formData.get("photoLocation");

  if (file && file.size > 50000000) {
    toast.error("file is too large");
  }

  try {
    /** @coord Get latitude & longitude from address using mapbox endpoint. */
    /** @newCoord array of coordinates from the response mapbox api */
    /** @newCoord mapped this array then added it's values to the photoCoords property in the formData that we will send to the endpoint to create new post. */
    const coord = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=${mapbox_api}`
    );

    /** @newCoord contains coordinates that we can map */
    /** @formData formData.append is to add to the photoCoords property each iterated value newValue */
    const newCoord = coord.data.features[0].geometry.coordinates;
    newCoord.map((newValue) => {
      return formData.append("photoCoords", newValue);
    });

    await axios.post("/api/photo/createPost", formData);
    toast.success("New post created");
    return redirect("/dashboard/home");
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
  /** @isSubmitting used to dynamically render the Button */
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className='flex justify-center'>
      <Card className='mt-6 w-94 md:w-[35rem] md:mt-[10rem] lg:w-[55rem] lg:mt-[15rem]'>
        <Form method='post' encType='multipart/form-data'>
          <CardBody className='flex flex-col items-center gap-3'>
            <Typography variant='h5' color='blue-gray' className='mb-2'>
              CREATE NEW POST
            </Typography>

            <Input label='Title of Post' name='title' />

            <Input label='Upload photo' type='file' name='photoUrl' />

            <Textarea label='Description of your photo' name='description' />

            <Input label='Location of your photo' name='photoLocation' />
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
