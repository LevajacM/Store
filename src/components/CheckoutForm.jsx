import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);

    const { token } = store.getState().userState.user;

    const { cartItems, orderTotal, cartItemsNum } = store.getState().cartState;

    const info = {
      address,
      cartItems,
      chargeTotal: orderTotal,
      name,
      numItemsInCart: cartItemsNum,
      orderTotal: formatPrice(orderTotal),
    };

    try {
      const resp = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ******
      queryClient.removeQueries(['orders']);
      // ******
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      if (error?.response?.status === 401 || 403) {
        toast.error('Unauthorized request, please login');
        return redirect('/login');
      }
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error while placing your order';
      toast.error(errorMessage);
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method='POST' className=' flex flex-col gap-y-4'>
      <h4 className=' font-medium text-xl capitalize'>shipping information</h4>
      <FormInput label='first name' type='text' name='name' />
      <FormInput label='address' name='address' type='text' />
      <div
        className='mt-4
        '
      >
        <SubmitBtn text='PLACE YOUR ORDER' />
      </div>
    </Form>
  );
};

export default CheckoutForm;
