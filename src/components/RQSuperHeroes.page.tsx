import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes').then((res) => res.data);
};

export const RQSuperHeroesPage = () => {
  const onSuccess = (data: any) => console.log('Data fetching completed', data);
  const onError = (error: any) => console.log('Data fetching failed...', error);
  const { isLoading, isError, error, data, refetch }: any = useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      refetchOnMount: true, // when a component mounts
      refetchOnWindowFocus: 'always', // when tab switches
      enabled: false, // disables auto fetch when component mounts
      onSuccess,
      onError,
      // refetchInterval: 2000, fetching interval
      // refetchIntervalInBackground: true,
      // cacheTime: 5000, remains in cache for set time
    }
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <h2>React Query fetched Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.map((hero: any) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
