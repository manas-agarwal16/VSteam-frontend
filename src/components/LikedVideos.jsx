import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { likedVideos } from "../store/features/userSlice";
import {Button , VideoList , Spinner} from "./index"
import { useNavigate } from "react-router-dom";

const LikedVideos = () => {
  const { loginStatus , loading } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(likedVideos());

      if (res?.payload?.data != []) {
        setVideos(res.payload.data);
      }
    };
    fetch();
  }, [loading]);

  return !loginStatus ? (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Liked Videos
      </div>
      <div className="flex justify-center lg:ml-[220px] items-center min-h-[60vh]">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white text-2xl my-8">
            Login to see your Liked Videos
          </p>
          <Button text="Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="text-4xl lg:ml-[220px] p-6 text-white font-bold">
        Liked Videos
      </div>
      <div className="lg:ml-[220px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#070707] min-h-screen p-6 text-gray-300">
        {videos?.map((video) => {

          return (
            <div
              key={video?._id}
              className="w-full h-72 bg-[#202026] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <VideoList
                videoFile={video.videoFile}
                avatar={video.avatar}
                username={video.username}
                views={video.views}
                thumbnail={video.thumbnail}
                title={video.title}
                video_id={video._id}
              />
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-center items-center col-span-full">
            <Spinner width={8} />
          </div>
        )}
      </div>
    </>
  );
};

export default LikedVideos;