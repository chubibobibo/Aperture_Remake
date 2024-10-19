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
import { Form, redirect, useNavigation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/auth/login", data);
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

function LoginPage() {
  /** @toggleHidePass onClick functions to change the @isHidden state to change the input type to text to password and to change the icons */
  const [isHidden, setIsHidden] = useState(true);
  const toggleHidePass = () => {
    setIsHidden(!isHidden);
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <section className=' h-screen flex justify-center items-center'>
      <Card className='w-72 -mt-[12rem] md:w-[40rem] md:-mt-[10rem] xl:-mt-[10rem]'>
        <div className='flex justify-center'>
          <Typography
            as='h1'
            // variant='large'
            color='blue-gray'
            className='ml-1 font-bold text-4xl'
          >
            LOGIN
          </Typography>
        </div>

        <Form method='POST'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Username' name='username' size='md' />
            <Input
              label='Password'
              name='password'
              type={isHidden ? "password" : "text"}
              size='md'
              icon={
                isHidden ? (
                  <IoMdEye onClick={toggleHidePass} />
                ) : (
                  <IoMdEyeOff onClick={toggleHidePass} />
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </CardBody>
        </Form>
        <CardFooter className='pt-0'>
          <Typography variant='small' className='mt-6 flex justify-center'>
            Don&apos;t have an account?
            <Typography
              as='a'
              href='/register'
              variant='small'
              color='blue-gray'
              className='ml-1 font-bold'
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
}
export default LoginPage;
