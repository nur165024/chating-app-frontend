import { useQuery } from '@tanstack/react-query';
import { authAPI } from '../../api/auth.api';
import { QUERY_KEYS } from '../../utils/constants';

export const useAuthProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH, 'profile'],
    queryFn: authAPI.getProfile
  });
};
