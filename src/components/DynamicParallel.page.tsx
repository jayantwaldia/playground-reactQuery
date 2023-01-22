import axios from 'axios';
import React from 'react';
import { useQueries } from 'react-query';

const fetchSuperHero = (heroId: any) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }: any) => {
  const lol = useQueries(
    heroIds.map((id: any) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );
  console.log(lol);
  return <div>lol</div>;
};
