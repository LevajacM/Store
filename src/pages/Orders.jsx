import {
  OrdersList,
  PaginationContainer,
  PaginationComplexContainer,
  SectionTitle,
} from '../components';
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You need to login first');
      return redirect('/login');
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const resp = await queryClient.ensureQueryData(ordersQuery(params, user));
      const orders = resp.data.data;
      const meta = resp.data.meta;
      return { orders, meta };
    } catch (error) {
      if (error?.response?.status === 401 || 403) {
        toast.error('Unauthorized request, please login');
        return redirect('/login');
      }
      const errorMessage =
        error?.response?.data?.error?.message || 'there was an error';
      toast.error(errorMessage);
      return null;
    }
  };

const Orders = () => {
  const { orders, meta } = useLoaderData();

  if (orders.length < 1) {
    return <SectionTitle text='please place an order' />;
  }

  return (
    <>
      <SectionTitle text='your orders' />
      <OrdersList />
      <PaginationContainer />
      <PaginationComplexContainer />
    </>
  );
};

export default Orders;
