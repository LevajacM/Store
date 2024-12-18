import { Link, useLoaderData } from 'react-router-dom';
import {
  formatPrice,
  customFetch,
  generateAmountOptions,
} from '../utils/index';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const resp = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    return { product: resp.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  const id = product.id;
  const { image, title, company, price, description, colors } =
    product.attributes;
  const formattedPrice = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: id + productColor,
    productID: id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}

      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className='w-96 rounded-xl h-96 object-cover lg:w-full'
        />

        {/* INFO */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-400 font-bold mt-2'>{company}</h4>
          <p className='mt-3 text-xl'>{formattedPrice}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize '>
              Colors
            </h4>
            <div className='mt-2'>
              {colors.map((item) => {
                return (
                  <button
                    key={item}
                    type='button'
                    className={`badge w-6 h-6 mr-2 ${
                      item === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: item }}
                    onClick={() => setProductColor(item)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT  */}
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='amount' className='label'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select
              id='amount'
              value={amount}
              onChange={handleAmount}
              className='select select-secondary select-bordered select-md '
            >
              {generateAmountOptions(10)}
            </select>
          </div>
          {/* ADD TO CART BTN */}
          <div className='mt-10'>
            <button
              className='btn btn-secondary btn-md uppercase'
              onClick={() => addToCart()}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
