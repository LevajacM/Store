import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  let prevOff = false;
  let nextOff = false;
  let prev;
  let next;
  if (page < 2) {
    prevOff = true;
  }
  if (page > 1) {
    prevOff = false;
  }
  if (page <= pageCount) {
    nextOff = true;
  }
  if (page < pageCount) {
    nextOff = false;
  }

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            prev = parseInt(page - 1);
            handlePageChange(prev);
          }}
          disabled={prevOff}
        >
          Prev
        </button>
        {pages.map((item) => {
          return (
            <button
              key={item}
              className={`btn btn-xs sm:btn-md join-item ${
                item === page ? 'bg-base-300 border-base-300' : ''
              }`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button>
          );
        })}
        <button
          className='btn btn-xs sm:btn-md join-item border-none'
          onClick={() => {
            next = page + 1;

            handlePageChange(next);
          }}
          disabled={nextOff}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
