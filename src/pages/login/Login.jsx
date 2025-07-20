import { use, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { GoLock, GoMail } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import darkIcon from "../../assets/fav-dark.png";
import lightIcon from "../../assets/favicon.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Toast from "../../components/toast/Toast";
// import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Login = () => {
  const [seePasswor, setSeepassword] = useState(false);
  const { userLogin, googleSignin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = use(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    userLogin(data.email, data.password)
      .then(() => {
        // update last login time
        axiosSecure
          .post("/post-user", { email: data.email })
          .then(() => {
            Toast({ type: "success", message: "Sign in successful" });
            navigate(location.state ? `${location.state}` : "/", {
              replace: true,
            });
            reset();
          })
          .catch((error) => {
            Toast({ type: "error", message: error.message });
          });
      })
      .catch((error) => {
        Toast({ type: "error", message: error.message });
      });
  };
  // google login
  const handleGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        // if user new (user info send in database)
        const user = result.user;
        const userInfo = {
          email: user.email,
          name: user.displayName,
          role: "user",
          membership: "bronze",
          joined: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        // database post req
        axiosSecure
          .post("/post-user", userInfo)
          .then(() => {
            Toast({ type: "success", message: "Sign in successful" });
            navigate(location.state ? `${location.state}` : "/", {
              replace: true,
            });
          })
          .catch((error) => {
            Toast({ type: "error", message: error.message });
          });
      })
      .catch((error) => {
        Toast({ type: "error", message: error.message });
      });
  };
  return (
    <div className="bg-base-100 flex justify-center items-center h-auto sm:min-h-200">
      <div className="w-full shadow-0 sm:w-2/3 lg:w-1/3 bg-boxbg sm:shadow p-10 rounded-lg">
        <div>
          <img
            className="w-14 mx-auto"
            src={isDark ? darkIcon : lightIcon}
            alt=""
          />
          <h1 className="text-center text-base-300 text-2xl font-bold mt-3">
            Welcome Back
          </h1>
          <p className="text-center text-base font-normal text-base-content mt-2">
            Sign in to your account to continue <br /> making an impact
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <label>Email</label>
            <div className="relative mt-1.5">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email"
                className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
              />
              <GoMail
                size={17}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
              />
            </div>
            {/* error message for email */}
            {errors.email?.type === "required" && (
              <p className="text-red-700 mt-1.5">Enter Your Email *</p>
            )}
            <label className="mt-3 block">Password</label>
            <div className="relative mt-1.5">
              <input
                type={seePasswor ? "text" : "password"}
                {...register("password", { required: true })}
                placeholder="Enter Your Password"
                className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
              />
              <GoLock
                size={17}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
              />
              {seePasswor ? (
                <AiOutlineEye
                  size={20}
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-base-content"
                  onClick={() => setSeepassword(!seePasswor)}
                />
              ) : (
                <IoEyeOffOutline
                  size={20}
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-base-content"
                  onClick={() => setSeepassword(!seePasswor)}
                />
              )}
            </div>
            {/* error message for password */}
            {errors.email?.type === "required" && (
              <p className="text-red-700 mt-1.5">Enter Your Password *</p>
            )}
            <input
              type="submit"
              value="Login"
              className="w-full mt-5 py-2 rounded-lg cursor-pointer bg-primary text-accent"
            />
          </form>
          <div className="divider text-sm uppercase mt-6 text-base-content">
            Or continue with
          </div>
          {/* login with google */}
          <button
            onClick={handleGoogleSignin}
            className="btn bg-white text-black border-[#e5e5e5] w-full mt-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center text-base-content text-base mt-4">
            Dont’t Have An Account ?
            <span className="text-primary font-semibold cursor-pointer">
              <Link to={"/auth/register"} state={location.state}>
                {" "}
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
