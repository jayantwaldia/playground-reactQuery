import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const addSuperHero = (hero: any) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError,
    // enabled: false, // disables auto fetch when component mounts
    // staleTime: 30000,
    // refetchOnMount: true, // when a component mounts
    //refetchOnWindowFocus: 'always', // when tab switches
    // cacheTime: 5000, remains in cache for set time
    // refetchInterval: 2000, fetching interval
    // refetchIntervalInBackground: true, // fetches even the browser is not in focus
    // select: (data) => {}, used to transform and return the data via map, filter operations.});
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data: any) => {
      // queryClient.invalidateQueries('super-heroes');
      queryClient.setQueryData('super-heroes', (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};
