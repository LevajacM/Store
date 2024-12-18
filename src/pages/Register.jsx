import { Link, Form, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  // console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  try {
    const resp = await customFetch.post('/auth/local/register', data);
    // console.log(resp);

    toast.success('account created successfully');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || 'please check your credentials';
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center font-bold text-3xl capitalize'>register</h4>
        <FormInput label='username' name='username' type='text' />
        <FormInput label='email' type='email' name='email' />
        <FormInput label='password' name='password' type='password' />
        <div className='mt-4'>
          <SubmitBtn text='REGISTER' />
        </div>
        <p className='text-center'>
          Already a member?
          <Link
            to='/login'
            className='ml-2 link link-hover link-primary capitalize'
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
