import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient.getQueryData('super-heroes');
      //   ?.data?.find((hero: any) => hero.id === parseInt(heroId));
      // if (hero) {
      //   return {
      //     data: hero,
      //   } as SuperHeroQueryData;
      // } else return undefined;
    },
  });
};
