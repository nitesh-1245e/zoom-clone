"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useState } from "react";

const Home = () => {
  const [showTime, setShowTime] = useState("");

  const updateTime = setInterval(() => {
    const timeSeconds: string = new Date().toLocaleTimeString();
    // console.log(timeSeconds)

    setShowTime(timeSeconds);
 
  }, 1000);

  const now = new Date();

  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className=" flex size-full flex-col gap-10 text-white  ">
      <div className="w-full h-[300px] rounded-[20px] bg-hero bg-cover ">
        <div className=" flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11  ">
          <h2 className="glassmorphism max-w-[270px]  rounded py-2 text-center text-base font-normal ">
            {" "}
            UpComing Meeting at: 12:30PM{" "}
          </h2>
          <div className=" flex flex-col gap-2 ">
            <h1 className="text-4xl font-extrabold lg:text-7xl   ">
              {showTime}
            </h1>
            <p className=" text-lg font-medium text-sky-1 lg:text-2xl  ">
              {" "}
              {date}{" "}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
