import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { subscriptionChannels } from "../store/features/subscriptionSlice";
import SubscriptionList from "./SubscriptionList";
import CenterSpinner from "./CenterSpinner";
import { Link } from "react-router-dom";

const Subscription = (_id) => {
  console.log("subscriptions : ", _id);

  const { loginStatus } = useSelector((state) => state.auth);
  const { loading, channels } = useSelector((state) => state.subscription);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscriptionChannels());
  }, [_id]);

  console.log("channels : ", channels);

  return loading ? (
    <>
      <CenterSpinner />{" "}
    </>
  ) : !loginStatus ? (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Liked Videos
      </div>
      <div className="flex items-center jus w-full lg:w-[80vw] min-h-[70vh] border-red-400 border-2 text-center">
        <p className="text-center">
          "Please log in to your account to access and view your subscriptions."
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Subscriptions
      </div>
      <div className="lg:ml-[220px]">
        {channels.length > 0 && (
          <ul>
            {channels?.map((subscription) => (
              <li className="cursor-pointer mx-4" key={subscription._id}>
                <SubscriptionList
                  username={subscription.username}
                  fullName={subscription.fullName}
                  avatar={subscription.avatar}
                  subscribers={subscription.subscribers}
                  subscribing={subscription.subscribing}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {channels.length === 0 && (
        <div className="flex p-10 px-20 flex-col justify-center items-center w-full h-[65vh] lg:ml-[220px] lg:w-[77vw] xl:w-[81vw] 2xl:w-[85vw]  mx-auto">
          <p className="flex justify-center items-center text-white text-xl font-semibold  text-center">
            You haven’t Subscribed any channel yet
          </p>
          <Link to={"/"} className="text-blue-500 underline mx-4">
            Home
          </Link>
        </div>
      )}
    </>
  );
};

export default Subscription;
