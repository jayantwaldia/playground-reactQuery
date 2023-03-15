import axios from 'axios';
import { useQuery } from 'react-query';

type SuperHeroQueryData = {
  data: any;
};

const fetchSuperHero = ({ queryKey }: any) => {
  const heroId = queryKey[1];
  return axios
    .get(`http://localhost:4000/superheroes/${heroId}`)
    .then((res) => res.data);
};

export const useSuperHeroData = (heroId: any) => {
  return useQuery(['super-hero', heroId], fetchSuperHero);
};
