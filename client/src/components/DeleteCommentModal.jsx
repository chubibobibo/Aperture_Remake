import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { Form } from "react-router-dom";

function DeleteCommentModal({ photoDataId, commentDataId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant='gradient' color='red'>
        DELETE
      </Button>
      <Dialog open={open} handler={handleOpen} size='xs'>
        {/* <DialogHeader>Its a simple modal.</DialogHeader> */}
        <DialogBody>Do you want to delete this comment?</DialogBody>
        <DialogFooter>
          <Form
            method='post'
            action={`/dashboard/post/deleteComment/${photoDataId}/${commentDataId}`}
          >
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
          </Form>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default DeleteCommentModal;
