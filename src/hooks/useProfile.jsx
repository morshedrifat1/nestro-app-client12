import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userProfile = {}, isLoading, refetch, error } = useQuery({
    enabled: !!user?.email,
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-profile?email=${user.email}`);
      return res.data;
    },
  });

  return { userProfile, isLoading, refetch, error };
};

export default useProfile;
