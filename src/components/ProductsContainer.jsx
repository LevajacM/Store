import { useLoaderData } from 'react-router-dom';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa6';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';
import { useState } from 'react';

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [list, setList] = useState(false);

  const productsNum = meta.pagination.total;

  const setActiveBtn = () => {
    return `text-xl btn btn-circle btn-sm btn-primary text-primary-content`;
  };
  const setInactiveBtn = () => {
    return `text-xl btn btn-circle btn-sm btn-ghost text-based-content`;
  };

  return (
    <>
      {/* HEADER */}

      <div className='border-b border-base-300 pb-5 flex justify-between items-center mt-8'>
        <h4 className='text-md font-medium '>
          {productsNum} product{productsNum > 1 && 's'}
        </h4>
        <div className='flex gap-x-2'>
          <button
            type='button'
            onClick={() => setList(false)}
            className={!list ? setActiveBtn() : setInactiveBtn()}
          >
            <BsFillGridFill className='text-xl' />
          </button>
          <button
            onClick={() => setList(true)}
            className={list ? setActiveBtn() : setInactiveBtn()}
          >
            <FaList className='text-xl' />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {productsNum === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...
          </h5>
        ) : list ? (
          <ProductsList />
        ) : (
          <ProductsGrid />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
