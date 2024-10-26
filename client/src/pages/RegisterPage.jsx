import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

/** ACTION FUNCTION to submit data from the forms to REGISTER API */
/** @formData data obtained from the forms using .formData method */
/** @data data from forms converted to useable object using Object.fromEntries() */
/** @confirmedPassword taking 2 passwords from input field and checking if they are the same */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const avatar = formData.get("avatarUrl");
  if (avatar && avatar.size > 5000000) {
    toast.error("Image too large");
  }
  const passwordData1 = formData.get("password1");
  const passwordData2 = formData.get("password2");
  // const data = Object.fromEntries(formData);
  // console.log(data);
  // const confirmedPassword = data.password1 === data.password2;
  const confirmedPassword = passwordData1 === passwordData2;
  if (confirmedPassword) {
    formData.set("password", passwordData1); //creating a new key in the formData to submit as password
    try {
      await axios.post("/api/auth/register", formData);
      toast.success("New user registered");
      return redirect("/login");
    } catch (err) {
      console.log(err);
      toast.error(
        Array.isArray(err?.response?.data?.message)
          ? err?.response?.data?.message[0]
          : err?.response?.data?.message
      );
      return err;
    }
  }
  return toast.error("Passwords don't match");
};

function RegisterPage() {
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
    <section className=' h-screen flex justify-center items-center'>
      <Card className='w-72 mt-24 mb-2 md:w-[25rem] md:-mt-[5rem] xl:-mt-[5rem] xl:w-[50rem]'>
        <Form method='POST' encType='multipart/form-data'>
          <CardBody className='flex flex-col gap-4'>
            <div className='flex justify-center'>
              <Typography
                as='h1'
                // variant='large'
                color='blue-gray'
                className='ml-1 font-bold text-4xl'
              >
                REGISTER
              </Typography>
            </div>
            <Input
              label='Upload your avatar image'
              type='file'
              name='avatarUrl'
              size='md'
            />
            <Input label='Username' name='username' size='md' />
            <Input label='First name' name='firstName' size='md' />
            <Input label='Last name' name='lastName' size='md' />
            <Input label='Email' name='email' size='md' />
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
            />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
            <div className='flex justify-center'>
              <Button
                variant='gradient'
                fullWidth
                type='submit'
                disabled={isSubmitting}
                className='w-40'
              >
                {isSubmitting ? "Registering user..." : "Register"}
              </Button>
            </div>
          </CardBody>
        </Form>
        <CardFooter className='pt-0'>
          <Typography variant='small' className='mt-6 flex justify-center'>
            Don&apos;t have an account?
            <Typography
              as='a'
              href='/login'
              variant='small'
              color='blue-gray'
              className='ml-1 font-bold'
            >
              Log in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
}
export default RegisterPage;
