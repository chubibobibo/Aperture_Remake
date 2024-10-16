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

import { useNavigate, Form } from "react-router-dom";
import { toast } from "react-toastify";

import ReactStars from "react-stars";
import axios from "axios";

function AddCommentModal({ loggedUser, photoData }) {
  /** @open state the handles the closing and opening of the modal */
  /** @commentData state that handles the data from inputs to be submitted to addComment API */
  /** @handleCommentData controls the input and sets the state */
  /** @ratingChanged handles data of the ReactStars component and set the state */

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [commentData, setCommentData] = useState({ body: "", rating: "" });

  const handleOpen = () => setOpen((cur) => !cur);

  const handleCommentData = (e) => {
    setCommentData((prevComment) => {
      return { ...prevComment, [e.target.name]: e.target.value };
    });
  };

  /** React Stars */
  const ratingChanged = (newRating) => {
    setCommentData((prevRating) => {
      commentData.rating = newRating;
      return commentData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/comment/addComment/${photoData._id}`, commentData);
      navigate(`/dashboard/post/${photoData._id}`);
      toast.success("New comment posted");
    } catch (err) {
      console.log(err);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
    }
  };

  /** @onClickNav conditionally redirect user to login if not logged in */
  const onClickNav = () => {
    toast.error("User needs to be logged in to leave a comment");
    navigate("/login");
  };

  return (
    <>
      {" "}
      <Button onClick={loggedUser ? handleOpen : onClickNav}>
        Add Comment
      </Button>
      <Dialog
        size='lg'
        open={open}
        handler={handleOpen}
        className='bg-transparent shadow-none'
      >
        <Card className='mx-auto w-full max-w-[30rem]'>
          <Form method='post' onSubmit={handleSubmit}>
            <CardBody className='flex flex-col gap-4'>
              <Typography variant='h4' color='blue-gray'>
                Add Comment
              </Typography>

              <Typography className='-mb-2' variant='h6'>
                Comment
              </Typography>
              <Textarea
                label='Message'
                size='md'
                name='body'
                onChange={handleCommentData}
                value={commentData.body}
              />
              <Typography className='-mb-2' variant='h6'>
                Rating
              </Typography>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={45}
                color2={"#ffd700"}
                half={false} // half points
              />
            </CardBody>
            <CardFooter className='pt-0'>
              <Button
                variant='gradient'
                onClick={handleOpen}
                fullWidth
                type='submit'
              >
                Add Comment
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Dialog>
    </>
  );
}
export default AddCommentModal;
