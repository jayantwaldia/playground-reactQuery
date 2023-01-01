import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes').then((res) => res.data);
};

export const RQSuperHeroesPage = () => {
  const { isLoading, isError, error, data }: any = useQuery(
    'super-heroes',
    fetchSuperHeroes
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
  return (
    <>
      <h2>React Query fetched Super Heroes Page</h2>
      {data.map((hero: any) => {
        return <div key={hero.id}>{hero.name}</div>;
      })}
    </>
  );
};
