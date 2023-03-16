import React, { Fragment } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

function InfiniteQueriesPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage: any, pages: any) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error?.message}</h2>;
  return (
    <>
      <div>
        {data?.pages.map((group: any, i: any) => (
          <Fragment key={i}>
            {group.data.map((color: any) => (
              <h2 key={color.id}>
                {color.id} {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}

export default InfiniteQueriesPage;
