import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useState } from "react";

import { useContext } from "react";
import { UserContext } from "../context/Context.js";
// import { UserContext } from "./HomeLayout";

/** ACTION FUNCTION to submit data from the forms to REGISTER API */
/** @formData data obtained from the forms using .formData method */
/** @data data from forms converted to useable object using Object.fromEntries() */
/** @confirmedPassword taking 2 passwords from input field and checking if they are the same */
/** @params used to obtain userId in params that will be used in calling the API for updating a specific user */
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const avatarFile = formData.get("avatarUrl");

  const pwd1 = formData.get("password1");
  const pwd2 = formData.get("password2");

  if (pwd1 !== pwd2) {
    return toast.error("Passwords doesn't match");
  } else {
    formData.set("password", pwd1);
  }

  if (avatarFile && avatarFile.size > 5000000) {
    toast.error("Avatar photo too large");
  }

  try {
    await axios.patch(`/api/auth/updateUser/${params.id}`, formData);
    toast.success("User successfully updated");
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

function UpdateUser() {
  const userData = useContext(UserContext);
  // console.log(userData);
  const user = userData.data.foundLoggedUser;
  console.log(user);
  /** @toggleHidePass1 @toggleHidePass2 onClick functions to change the @isHidden state to change the input type to text to password and to change the icons */
  const [isHidden, setIsHidden] = useState({
    password1: true,
    password2: true,
  });
  const toggleHidePass1 = () => {
    setIsHidden((prev) => ({
      ...prev,
      password1: !isHidden.password1,
    }));
  };
  const toggleHidePass2 = () => {
    setIsHidden((prev) => ({
      ...prev,
      password2: !isHidden.password2,
    }));
  };

  /** @isSubmitting defines the state of navigation to dynamically disable the register button */
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className='h-screen flex justify-center items-center'>
      <Card className='w-[25rem] -mt-[5rem]  md:w-[35rem] md:-mt-[5rem]'>
        <Typography variant='h3' className='flex justify-center'>
          Update your Profile
        </Typography>
        <Form method='post' encType='multipart/form-data'>
          <CardBody className='flex flex-col gap-4'>
            <Input
              label='Upload photo'
              type='file'
              name='avatarUrl'
              size='md'
            />
            <Input
              label='Username'
              name='username'
              size='md'
              defaultValue={user.username}
            />
            <Input
              label='First name'
              name='firstName'
              size='md'
              defaultValue={user.firstName}
            />
            <Input
              label='Last name'
              name='lastName'
              size='md'
              defaultValue={user.lastName}
            />
            <Input
              label='Email'
              name='email'
              size='lg'
              defaultValue={user.email}
            />
            <Input
              label='Password'
              name='password1'
              type={isHidden.password1 ? "password" : "text"}
              size='md'
              icon={
                isHidden.password1 ? (
                  <IoMdEyeOff onClick={toggleHidePass1} />
                ) : (
                  <IoMdEye onClick={toggleHidePass1} />
                )
              }
              defaultValue={user.password}
            />
            <Input
              label='Re-enter your password'
              name='password2'
              type={isHidden.password2 ? "password" : "text"}
              size='md'
              icon={
                isHidden.password2 ? (
                  <IoMdEyeOff onClick={toggleHidePass2} />
                ) : (
                  <IoMdEye onClick={toggleHidePass2} />
                )
              }
              defaultValue={user.password}
            />
            <Button
              variant='gradient'
              fullWidth
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating user..." : "Update"}
            </Button>
          </CardBody>
        </Form>
      </Card>
    </section>
  );
}
export default UpdateUser;
