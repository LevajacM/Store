import { formatPrice } from '../utils/index';
import { useState } from 'react';

const FormRangeInput = ({ label, name, size, price }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [priceRange, setPriceRange] = useState(price || maxPrice);

  return (
    <div className='form-control'>
      <label htmlFor='name' className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
        <span className='label-text-alt'>{formatPrice(priceRange)}</span>
      </label>
      {/* inp */}
      <input
        type='range'
        name={name}
        min={0}
        max={maxPrice}
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        step={step}
        className={`range range-primary ${size}`}
      />
      {/*  */}
      <div className='label'>
        <span className='label-text-alt'>0</span>
        <span className='label-text-alt'>Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};

export default FormRangeInput;
