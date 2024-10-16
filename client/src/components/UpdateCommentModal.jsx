import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";

import ReactStars from "react-stars";
import axios from "axios";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/** @singleComment and @photoData props from PostPage.jsx that's needed to obtain the id of the specific comment and data of specific photo. */
function UpdateCommentModal({ singleComment, photoData }) {
  console.log(photoData);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  /** @commentData state that will handle the data to be sent to the update API*/
  /** @ratingChanged function that handles the onChange event of the react stars component(handles the star rating) */
  const [commentData, setCommentData] = useState({ body: "", rating: "" });

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setCommentData((prevData) => {
      commentData.rating = newRating;
      return commentData;
    });
  };

  /** Submitting update comment */
  const handleInputChange = (e) => {
    setCommentData((newCommentData) => {
      return { ...newCommentData, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `/api/comment/updateComment/${singleComment}`,
        commentData
      );
      navigate(`/dashboard/post/${photoData}`);
      toast.success("Comment successfully updated");
    } catch (err) {
      console.log(err);
      navigate(`/dashboard/post/${photoData}`);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  };

  return (
    <>
      <Button color='amber' onClick={handleOpen}>
        Update
      </Button>
      <Dialog
        size='xs'
        open={open}
        handler={handleOpen}
        className='bg-transparent shadow-none'
      >
        <Card className='mx-auto w-full max-w-[24rem]'>
          <Form method='post' onSubmit={handleSubmit}>
            <CardBody className='flex flex-col gap-4'>
              <Typography variant='h4' color='blue-gray'>
                Update Comment
              </Typography>
              <Typography className='-mb-2' variant='h6'>
                What do you think about the photo.
              </Typography>
              <Textarea
                label='Comment'
                name='body'
                value={commentData.body}
                onChange={handleInputChange}
              />
              <Typography className='-mb-2' variant='h6'>
                Rate the photo.
              </Typography>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={55}
                color2={"#ffd700"}
                half={false} // half points
              />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button
                variant='gradient'
                onClick={handleOpen}
                fullWidth
                color='amber'
                type='submit'
              >
                Update
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Dialog>
    </>
  );
}
export default UpdateCommentModal;
