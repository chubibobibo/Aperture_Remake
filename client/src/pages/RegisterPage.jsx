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

import { Form, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

/** @formData data obtained from the forms using .formData method */
/** @data data from forms converted to useable object using Object.fromEntries() */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await axios.post("/api/auth/register", data);
    toast.success("New user registered");
    return redirect("/");
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

function RegisterPage() {
  return (
    <section className=' h-screen flex justify-center items-center'>
      <Card className='w-72 md:w-[40rem] md:-mt-[15rem]'>
        {/* <CardHeader
          variant='gradient'
          color='gray'
          className='mb-4 grid h-28 place-items-center'
        >
          <Typography variant='h3' color='white'>
            Sign In
          </Typography>
        </CardHeader> */}
        <Form method='POST'>
          <CardBody className='flex flex-col gap-4'>
            <Input label='Username' name='username' size='lg' />
            <Input label='First name' name='firstName' size='lg' />
            <Input label='Last name' name='lastName' size='lg' />
            <Input label='Email' name='email' size='lg' />
            <Input label='Password' name='password' type='password' size='lg' />
            <div className='-ml-2.5'>
              <Checkbox label='Remember Me' />
            </div>
            <Button variant='gradient' fullWidth type='submit'>
              Register
            </Button>
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
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
}
export default RegisterPage;
