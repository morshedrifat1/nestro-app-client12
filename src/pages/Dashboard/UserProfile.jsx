import { Award, BadgeCheck, Crown } from "lucide-react";
import LoadingSpiner from "../../components/loadingSpiner/LoadingSpiner";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const UserProfile = () => {
  const { user, loader } = useAuth();

  const {userProfile,isLoading} = useProfile();
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
                  <Crown></Crown>
                )}
                {userProfile.membership}
              </p>
            </div>
          </div>
          {/* user activity */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">{userProfile.totalPost}</h1>
              <p className="text-lg font-normal text-navlink px-3">
                Total Posts
              </p>
            </div>
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">01</h1>
              <p className="text-lg font-normal text-navlin px-3">
                Total Votes
              </p>
            </div>
            <div className="text-center bg-boxbg shadow-2xs border border-mainborder py-4 rounded-lg space-y-1">
              <h1 className="text-base-300 text-2xl font-bold">01</h1>
              <p className="text-lg font-normal text-navlink px-3">
                Comments Received
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
        </div>
      )}
    </>
  );
};

export default UserProfile;
