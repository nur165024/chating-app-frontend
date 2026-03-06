import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI } from '../../api/user.api';
import { useAuthStore } from '../../store/useAuthStore';
import { QUERY_KEYS } from '../../utils/constants';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const updateUser = useAuthStore((state) => state.updateUser);

  return useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data) => {
      updateUser(data.data);
      queryClient.invalidateQueries([QUERY_KEYS.AUTH]);
    }
  });
};

export const useUpdateOnlineStatus = () => {
  return useMutation({
    mutationFn: userAPI.updateOnlineStatus
  });
};
