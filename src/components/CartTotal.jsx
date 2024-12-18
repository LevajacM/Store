import { useSelector } from 'react-redux';
import { formatPrice } from '../utils';

const CartTotal = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );

  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='border-b border-base-300 text-xs  pb-2 flex justify-between capitalize '>
          <span>subtotal</span>
          <span className='font-medium'>{formatPrice(cartTotal)}</span>
        </p>

        {/* SHIPPING */}
        <p className='border-b border-base-300 text-xs  pb-2 flex justify-between capitalize '>
          <span>shipping</span>
          <span className='font-medium'>{formatPrice(shipping)}</span>
        </p>

        {/* TAX */}
        <p className='border-b border-base-300 text-xs  pb-2 flex justify-between capitalize '>
          <span>tax</span>
          <span className='font-medium'>{formatPrice(tax)}</span>
        </p>

        {/* ORDER TOTAL */}
        <p className=' pb-2 pt-4 flex justify-between capitalize text-sm mt-4'>
          <span>order total</span>
          <span className='font-medium'>{formatPrice(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotal;
