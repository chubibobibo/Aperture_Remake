import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Form } from "react-router-dom";

function DeletePostModal({ photoData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  // console.log(photoData);

  return (
    <section>
      <Button onClick={handleOpen} variant='gradient' color='red'>
        Delete Post
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete your post?</DialogHeader>
        <Form method='post' action={`/dashboard/post/deletePost/${photoData}`}>
          <DialogFooter>
            <Button
              variant='text'
              color='red'
              onClick={handleOpen}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant='gradient'
              color='green'
              onClick={handleOpen}
              type='submit'
            >
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Form>
      </Dialog>
    </section>
  );
}
export default DeletePostModal;
