import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUser = ({ queryKey }: any) => {
  const usermail = queryKey[1];
  return axios
    .get(`http://localhost:4000/users/${usermail}`)
    .then((res) => res.data);
};

const fetchFrameworks = (channelId: any) => {
  return axios
    .get(`http://localhost:4000/chanels/${channelId}`)
    .then((res) => res.data);
};

export const DependentQueriespage = ({ email }: any) => {
  const { data: user } = useQuery(['user', email], fetchUser);
  const channelId = user?.channelId;
  const {
    error,
    data: channels,
    isError,
    isLoading,
  } = useQuery(['courses', channelId], () => fetchFrameworks(channelId), {
    enabled: !!channelId,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.message}</p>;
  return (
    <div>
      <p>
        User Email : {email}, channelId : {user?.channelId}
      </p>
      <p>Channels List :</p>
      <ul>
        {channels?.courses?.map((channel: string) => (
          <li key={channel}>{channel}</li>
        ))}
      </ul>
    </div>
  );
};
