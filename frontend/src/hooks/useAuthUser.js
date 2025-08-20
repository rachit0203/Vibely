import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api';

// it is a custom hook 

const useAuthUser = () => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
    isSuccess
  } = useQuery({
    queryKey: ["authUser"], 
    queryFn: getAuthUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });


  return { 
    isLoading,
    isError,
    error,
    authUser: data?.user || null,
    isAuthenticated: isSuccess && !!data?.user,
    refetch
  };
}

export default useAuthUser;
