import { formatPrice, generateAmountOptions } from '../utils';
import { useDispatch } from 'react-redux';
import { editItem, removeItem } from '../features/cart/cartSlice';

const CartItem = ({
  cartID,
  amount,
  price,
  image,
  title,
  company,
  productColor,
}) => {
  const dispatch = useDispatch();

  const removeCartItem = () => {
    dispatch(removeItem({ cartID }));
  };
  const handleAmount = (e) => {
    amount = parseInt(e.target.value);
    dispatch(editItem({ cartID, amount }));
  };

  return (
    <article
      key={cartID}
      className='mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300  pb-6 last:border-b-0'
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
      />
      {/* INFO */}
      <div className='sm:ml-16 sm:w-36'>
        {/* title */}
        <h3 className='capitalize font-medium '>{title}</h3>
        {/* company */}
        <h4 className='capitalize text-sm text-neutral-400 mt-2'>{company}</h4>
        {/* color */}
        <p className='mt-4 text-sm capitalize flex items-center gap-x-2'>
          color :{' '}
          <span
            className='badge badge-sm'
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      {/* AMOUNT & REMOVE */}
      <div className='sm:ml-12'>
        {/* amount */}
        <div className='form-control max-w-xs'>
          <label htmlFor='amount' className='label p-0'>
            <span className='label-text'>Amount</span>
          </label>
          <select
            name='amount'
            id='amount'
            className='mt-2 select select-base select-bordered select-xs'
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>

        {/* remove */}
        <button
          className='mt-2 link link-primary link-hover text-sm'
          onClick={removeCartItem}
        >
          remove
        </button>
      </div>
      {/* PRICE */}
      <p className='font-medium sm:ml-auto'>{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
