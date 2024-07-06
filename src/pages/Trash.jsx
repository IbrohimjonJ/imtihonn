import React from "react";
import { Link } from "react-router-dom";

function Trash() {
  return (
    <>
              <div className="m-auto flex justify-center items-center h-[745px] max-w-[1220px]">
            <div className="flex flex-col text-center justify-center items-center">
          <img src="./trash.png" alt="png" />
          <h1 className="font-semibold text-[34px]">
            Your cart is empty and sad :{`(`}
          </h1>
                   <Link href={"/"}>
            <button className="mt-[50px] text-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 hover:text-white duration-300 font-bold w-[250px] h-[61px] bg-[#8A33FD] rounded-[8px]">
              Home
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Trash;
