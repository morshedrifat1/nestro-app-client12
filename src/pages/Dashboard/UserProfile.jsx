import { Award, BadgeCheck, Crown } from "lucide-react";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router";

const UserProfile = () => {
  const { user, loader } = useAuth();

  const { userProfile, isLoading } = useProfile();
  // post date
      const getTimeAgo = (createdAt) => {
        return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
      };
  return (
    <>
      {loader || isLoading ? (
        <LoadingSpiner></LoadingSpiner>
      ) : (
        <div className="bg-white/5 p-5 shadow-2xs shadow-accent  rounded-lg border border-mainborder ">
          <div className="space-y-2.5">
            <h1 className="text-base-300 text-2xl font-bold">My Profile</h1>
            <p className="text-base font-normal text-base-content">
              Manage your profile and posts
            </p>
          </div>
          {/* user info */}
          <div className="mt-10 flex items-center gap-4">
            <div role="button" tabIndex={0} className="group">
              <img
                src={user && user?.photoURL}
                className="ring-offset-base-100 sm:inline ring-btn w-16 h-16  sm:w-20 sm:h-20 rounded-full ring-1 ring-offset-3"
              />
            </div>
            <div>
              <h1 className="text-base-300 text-lg font-bold flex items-center gap-2">
                {user?.displayName}{" "}
                <BadgeCheck
                  className="bg-gradient-to-b from-[#24b2fd] to-[#036ae3] rounded-full text-white"
                  size={18}
                ></BadgeCheck>
              </h1>
              <p className="text-base font-normal text-navlink/70 ">
                {user?.email}
              </p>
              <p className="flex items-center gap-1 bg-base-300 w-fit px-3 text-sm font-medium py-0.5 rounded-full text-base-100 border border-mainborder mt-1">
                {userProfile.membership === "Bronze" ? (
                  <Award size={15}></Award>
                ) : (
                  <Crown size={15}></Crown>
                )}
                {userProfile.membership}
              </p>
            </div>
          </div>

          {/* Membership Status */}
          <div className="border border-mainborder bg-boxbg mt-5 p-5 rounded-lg">
            <h1 className="text-base-300 text-lg font-bold">
              Membership Status
            </h1>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
              <div>
                <h1 className="text-base-300 text-lg font-semibold">
                  Current Status
                </h1>
                <p className="text-base font-normal text-navlink">
                  {userProfile.membership}
                </p>
              </div>
              <div>
                <h1 className="text-base-300 text-lg font-semibold">
                  Member Since
                </h1>
                <p className="text-base font-normal text-navlink">
                  {userProfile?.joined}
                </p>
              </div>
              <div>
                <h1 className="text-base-300 text-lg font-semibold">
                  Current Status
                </h1>
                <p className="text-base font-normal text-navlink">
                  {userProfile.membership === "Bronze"
                    ? "Only create up to 5 posts."
                    : "Unlimited posts, Priority support"}
                </p>
              </div>
            </div>
          </div>
          {/* recent posts */}
          <div className="border border-mainborder bg-boxbg mt-5 p-5 rounded-lg">
            <h1 className="text-base-300 text-lg font-bold">Recent Posts</h1>
            <div className="space-y-4 mt-4">
              {userProfile?.recentPosts?.map((post)=>
              <div className="bg-subHeading p-4 rounded-lg">
                <h1 className="text-base-300 text-base font-medium">{post.postTitle} <span className="text-sm font-normal">• {getTimeAgo(post?.postTime)}</span></h1>
                <p className="mt-1 text-sm font-normal text-base-content">{post.postDescription}</p>
                <Link to={`/post-details/${post._id}`} className="bg-base-300 text-accent px-3 py-1 rounded-lg inline-block mt-2">Details</Link>
              </div>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
