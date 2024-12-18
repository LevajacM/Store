import axios from 'axios';

const baseUrl = 'https://strapi-store-server.onrender.com/api';

export const customFetch = axios.create({
  baseURL: baseUrl,
});

export const formatPrice = (price) => {
  const dollars = price / 100;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(dollars);
};

export const generateAmountOptions = (num) => {
  return Array.from({ length: num }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
