import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchColors = (pageNo: any) => {
  return axios
    .get(`http://localhost:4000/colors?_limit=2&_page=${pageNo}`)
    .then((res) => res.data);
};

function PaginatedQueriesPage() {
  const [pageNo, setPageNo] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['colors', pageNo],
    () => fetchColors(pageNo),
    { keepPreviousData: true }
  );

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error?.message}</h2>;
  return (
    <>
      {' '}
      <div>
        {data?.map((color: any) => (
          <h3 key={color.id}>
            {color.id}. {color.label}
          </h3>
        ))}
      </div>
      <div>
        <button
          onClick={() => setPageNo((page) => page - 1)}
          disabled={pageNo === 1}
        >
          prev page
        </button>
        <button
          onClick={() => setPageNo((page) => page + 1)}
          disabled={pageNo === 4}
        >
          next page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
}

export default PaginatedQueriesPage;
