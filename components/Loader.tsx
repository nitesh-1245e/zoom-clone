import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full  ">
      <Image src={"/photos/content.svg"} alt="loader" width={50} height={50} />
    </div>
  );
};

export default Loader;
