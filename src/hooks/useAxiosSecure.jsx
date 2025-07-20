import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { user, userSignout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API}`,
  });

  useEffect(() => {
    // ✅ Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        if (user?.email) {
          config.headers.email = user.email;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;

        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          userSignout()
            .then(() => navigate("/login"))
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // ✅ Clean up interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, userSignout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
