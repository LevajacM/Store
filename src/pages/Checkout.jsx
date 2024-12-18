import { SectionTitle, CheckoutForm, CartTotal } from '../components';
import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn('You need to login to access checkout page');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cartState);

  if (cartItems.length < 1) {
    return <SectionTitle text='your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='place your order' />
      <div className='grid mt-8 gap-8 md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotal />
      </div>
    </>
  );
};

export default Checkout;
