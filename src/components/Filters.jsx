import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelectInput from './FormSelectInput';
import FormRangeInput from './FormRangeInput';
import FormCheckBox from './FormCheckBox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const categories = meta.categories;
  const companies = meta.companies;

  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* SEARCH PRODUCT*/}
      <FormInput
        label='search product'
        name='search'
        type='search'
        size='input-sm'
        defaultValue={params.search}
      />

      {/* SELECT CATEGORY */}
      <FormSelectInput
        label='select category'
        name='category'
        list={categories}
        size='select-sm'
        defaultValue={params.category}
      />

      {/* SELECT COMPANY */}
      <FormSelectInput
        label='select company'
        name='company'
        list={companies}
        size='select-sm'
        defaultValue={params.company}
      />

      {/* SORT BY */}
      <FormSelectInput
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        size='select-sm'
        defaultValue={params.order}
      />

      {/* SELECT PRICE RANGE*/}
      <FormRangeInput
        label='select price'
        name='price'
        size='range-sm'
        price={params.price}
      />

      {/* FREE SHIPPING CHECK BOX */}
      <FormCheckBox
        name='shipping'
        label='free shipping'
        size='checkbox-sm'
        defaultValue={params.shipping}
      />

      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm uppercase'>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm uppercase'>
        reset
      </Link>
    </Form>
  );
};

export default Filters;
