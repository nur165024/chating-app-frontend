import { useQuery } from '@tanstack/react-query';
import { userAPI } from '../../api/user.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useUsers = (search = '') => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, search],
    queryFn: () => userAPI.getAllUsers(search),
    enabled: search.length > 0
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => userAPI.getUserById(id),
    enabled: !!id
  });
};
