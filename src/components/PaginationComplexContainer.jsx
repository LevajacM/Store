import { useLoaderData, useNavigate, useLocation } from 'react-router-dom';

const PaginationComplexContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

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

  const addPageBtn = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs sm:btn-md join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageBtns = () => {
    const pageButtons = [];
    // FIRST
    pageButtons.push(addPageBtn({ pageNumber: 1, activeClass: page === 1 }));

    //  ...
    if (page !== 2 && page !== 1) {
      pageButtons.push(
        <button key={'dot-1'} className={`btn btn-xs sm:btn-md join-item`}>
          ...
        </button>
      );
    }

    // ACTIVE
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageBtn({ pageNumber: page, activeClass: true }));
    }

    if (page !== pageCount - 1 && page !== pageCount) {
      //  ...
      pageButtons.push(
        <button key={'dot-2'} className={`btn btn-xs sm:btn-md join-item`}>
          ...
        </button>
      );
    }

    // LAST
    pageButtons.push(
      addPageBtn({ pageNumber: pageCount, activeClass: page === pageCount })
    );

    return pageButtons;
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
        {renderPageBtns()}
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

export default PaginationComplexContainer;

{
  /* <button
              key={item}
              className={`btn btn-xs sm:btn-md join-item ${
                item === page ? 'bg-base-300 border-base-300' : ''
              }`}
              onClick={() => handlePageChange(item)}
            >
              {item}
            </button> */
}
