import { updateProfile } from "firebase/auth";
import { use, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GoLock, GoMail } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import darkIcon from "../../assets/fav-dark.png";
import lightIcon from "../../assets/favicon.png";
import { ThemeContext } from "../../context/themeContext/ThemeContext";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toast from "../../components/toast/Toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Register = () => {
  const [seePasswor, setSeepassword] = useState(false);
  const {userSignUp, googleSignin} = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isDark } = use(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    userSignUp(data.email, data.password)
      .then(async (userCredential) => {
        // user profile pic upload in imgbb
        const profilePic = data.profilePic[0];
        const formData = new FormData();
        formData.append("image", profilePic);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API
          }`,
          formData
        );
        const profilePicUrl = res.data.data.url;
        const user = userCredential.user;
        // update User Name and profile  pic in firebase
        updateProfile(user, { displayName: data.name, photoURL: profilePicUrl })
          .then(() => {
            // send user info in database
            console.log(user);
            const userInfo = {
              email: data.email,
              name: data.name,
              role: "user",
              membership: "Bronze",
              joined: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };
            // database post req
            axiosSecure
              .post("/post-user", userInfo)
              .then(() => {
                Toast({ type: "success", message: "Sign in successful" });
                reset();
                navigate(location?.state ? `${location?.state}` : "/", {
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
      })
      .catch((error) => {
        Toast({ type: "error", message: error.message });
      });
  };

  // google sign in
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
        axiosSecure.post("/post-user", userInfo)
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
    <div className="bg-base-100 flex justify-center items-center h-auto sm:min-h-230">
      <div className="w-full shadow-0 sm:w-2/3 lg:w-1/3 bg-boxbg sm:shadow p-10 rounded-lg">
        <div>
          <img
            className="w-14 mx-auto"
            src={isDark ? darkIcon : lightIcon}
            alt=""
          />
          <h1 className="text-center text-base-300 text-2xl font-bold mt-3">
            Join Nastro
          </h1>
          <p className="text-center text-base font-normal text-base-content mt-2">
            Create your account and start making <br /> a difference in your
            community
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <label>Your Name</label>
            <div className="relative mt-1.5">
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter Your Name"
                className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
              />
              <FiUser
                size={17}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
              />
            </div>
            {/* error message for name */}
            {errors.name?.type === "required" && (
              <p className="text-red-700 mt-1.5">Enter Your Name *</p>
            )}
            <label className="mt-3 block">Email</label>
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
            <label className="mt-3 block">Select Profile Picture</label>
            <div className="relative mt-1.5">
              <input
                type="file"
                {...register("profilePic", {
                  required: "Profile picture is required",
                  validate: {
                    isImage: (files) =>
                      files && files[0]?.type.startsWith("image/")
                        ? true
                        : "Only image files are allowed",
                    fileSize: (files) =>
                      files && files[0]?.size <= MAX_FILE_SIZE
                        ? true
                        : "File size must be less than 2MB",
                  },
                })}
                placeholder="Enter Your Photo Url"
                className="pl-10 border-2 border-mainborder w-full bg-base-100 p-2 rounded-lg text-sm text-base-content focus:outline focus:outline-offset-2 focus:outline-border-outline"
              />
              <CiImageOn
                size={17}
                className="absolute top-1/2 -translate-y-1/2 left-3 text-base-content "
              />
            </div>
            {errors.profilePic && (
              <p className="text-red-700 mt-1.5">{errors.profilePic.message}</p>
            )}
            <label className="mt-3 block">Password</label>
            <div className="relative mt-1.5">
              <input
                type={seePasswor ? "text" : "password"}
                {...register("password", {
                  required: "Use a strong password",
                  validate: {
                    hasUpper: (value) =>
                      /[A-Z]/.test(value) ||
                      "Password must include at least one uppercase letter (A–Z)",
                    hasLower: (value) =>
                      /[a-z]/.test(value) ||
                      "Password must include at least one lowercase letter (a–z)",
                    hasNumber: (value) =>
                      /[0-9]/.test(value) ||
                      "Password must include at least one number (0–9)",
                    hasSpecial: (value) =>
                      /[!@#$%^&*]/.test(value) ||
                      "Password must include at least one special character (!@#$%^&*)",
                    minLength: (value) =>
                      value.length >= 8 ||
                      "Password must be at least 8 characters long",
                  },
                })}
                placeholder="Enter A Password"
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
            {errors.password && (
              <p className="text-red-700 mt-1.5">{errors.password.message}</p>
            )}
            <input
              type="submit"
              value="Sign Up"
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
            Already have an account?
            <span className="text-primary font-semibold cursor-pointer">
              <Link to={"/auth/login"}> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
