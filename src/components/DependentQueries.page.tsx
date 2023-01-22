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
    .get(`http://localhost:4000/channels/${channelId}`)
    .then((res) => res.data);
};

export const DependentQueriespage = ({ email }: any) => {
  const { data: user } = useQuery(['user', email], fetchUser);
  const channelId = user?.channelId;
  const { data: channels } = useQuery(
    ['courses', channelId],
    () => fetchFrameworks(channelId),
    {
      enabled: !!channelId,
    }
  );
  return <div>Ok</div>;
};
