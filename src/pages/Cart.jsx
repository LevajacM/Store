import { CartItemsList, CartTotal, SectionTitle } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { user } = useSelector((state) => state.userState);

  const cartItemsNum = useSelector((state) => state.cartState.cartItemsNum);

  if (cartItemsNum === 0) {
    return <SectionTitle text='your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='shopping cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotal />
          {user ? (
            <Link
              to='/checkout'
              className='btn btn-block btn-primary mt-8 uppercase'
            >
              proceed to checkout
            </Link>
          ) : (
            <Link
              to='/login'
              className='btn btn-block btn-primary uppercase mt-8'
            >
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
