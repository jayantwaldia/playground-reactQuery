import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchSuperHero = (heroId: any) => {
  return axios.get(`http://localhost:4000/superheroes`).then((res) => res.data);
};

const fetchFriends = (heroId: any) => {
  return axios.get(`http://localhost:4000/friends`).then((res) => res.data);
};

export const ParallelQueriesPage = () => {
  const { data: superHeroes }: any = useQuery('super-heroes', fetchSuperHero);
  const { data: friends }: any = useQuery('friends', fetchFriends);

  return (
    <div>
      <ul>
        {superHeroes?.map((sp: any) => (
          <li key={sp.id}>{sp.name}</li>
        ))}
      </ul>
      <ul>
        {friends?.map((f: any) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
};
