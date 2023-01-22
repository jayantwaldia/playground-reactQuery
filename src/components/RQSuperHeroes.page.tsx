import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSuperHeroesData } from '../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

export const RQSuperHeroesPage = () => {
  const onSuccess = (data: any) => console.log('Data fetching completed', data);
  const onError = (error: any) => console.log('Data fetching failed...', error);
  const { isLoading, isError, error, data, refetch }: any = useSuperHeroesData(
    onSuccess,
    onError
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <h2>React Query fetched Super Heroes Page</h2>
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.map((hero: any) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>
              {hero.name} : {hero.alterEgo}
            </Link>
          </div>
        );
      })}
    </>
  );
};
