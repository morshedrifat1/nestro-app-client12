import React, { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
});

const useAxiosSecure = () => {
  const { user, userSignout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return;
    }
    axiosSecure.interceptors.request.use(
      (config) => {
        if (user) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
          config.headers.email = user.email;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [user]);

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.status;
      console.log(status);
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        userSignout()
          .then(() => {
            navigate("/auth/login");
          })
          .catch(() => {});
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
