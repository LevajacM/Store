import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/index';

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {products.map((item) => {
        const { image, price, title } = item.attributes;
        const formattedPrice = formatPrice(price);
        return (
          <Link
            to={`/products/${item.id}`}
            key={item.id}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={title}
                className='w-full h-64 object-cover rounded-xl md:h-48'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-secondary'>{formattedPrice}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
