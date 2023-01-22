import React from 'react';
import { useParams } from 'react-router-dom';
import { useSuperHeroData } from '../hooks/useSuperHeroData';

export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const { isLoading, isError, error, data }: any = useSuperHeroData(heroId);

  if (isLoading) return <h2>Loading</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      {data?.name} - {data?.alterEgo}{' '}
    </div>
  );
};
