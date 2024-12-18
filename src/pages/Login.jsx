import { Link, Form, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const resp = await customFetch.post('/auth/local', data);
      console.log(resp);

      store.dispatch(loginUser(resp.data));
      toast.success('logged in successfully');
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please check your credentials';
      toast.error(errorMessage);
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginAsGuest = async () => {
    try {
      const resp = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(resp.data));
      toast.success('Welcome guest user');
      navigate('/');
    } catch (error) {
      toast.error('Guest user login problem, please try again');
    }
  };

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='POST'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center font-bold text-3xl'>Login</h4>
        <FormInput label='email' type='email' name='identifier' />
        <FormInput label='password' name='password' type='password' />
        <div
          className='mt-4
        '
        >
          <SubmitBtn text='LOGIN' />
        </div>
        <button
          type='button'
          className='btn btn-secondary btn-block'
          onClick={loginAsGuest}
        >
          GUEST USER
        </button>
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-primary capitalize'
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
