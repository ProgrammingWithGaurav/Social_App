import React from "react";
import Moment from "react-moment";
import { useStateContext } from "../contexts/StateContext";
import AddModal from '../components/AddModal';

const Profile = () => {
    const {user} = useStateContext();
  return (
    <div>
      <section
        className=" dark:bg-gray-800 flex font-medium items-center justify-center h-screen"
      >
        <section className="w-64 mx-auto dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">
            <Moment fromNow className="text-sm pr-5">
                {user?.createdAt?.toDate()}
              </Moment>
            </span>
            <span className="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={user?.photoURL}
              className="rounded-full w-28 "
              alt="profile picture"
              srcset=""
            />
          </div>

          <div className="mt-8 ">
            <h2 className="dark:text-white text-gray-700 font-bold text-2xl tracking-wide">
             {user?.displayName}
            </h2>
          </div>
          <p className="text-emerald-400 font-semibold mt-2.5">Active</p>
        </section>
      </section>

      <AddModal />
    </div>
  );
};

export default Profile;
