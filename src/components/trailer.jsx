import { useContext } from "react";
import { MyContext } from "./input";
export default function Trailer({ urlForVideo }) {
  const values = useContext(MyContext);
  const backButton = () => {
    values.setSwipe(false);
  };
  return (
    <>
      <div className="flex flex-start">
        <button
          onClick={backButton}
          className="border-[#7671a8] border-[2px] p-1 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-[#7671a8] transition cursor-pointer text-lg sm:text-xl"
        >
          Home
        </button>
      </div>
      <div className="flex justify-center my-[80px]">
        <iframe
          className="w-[100%] sm:w-[70%] h-[200px] sm:h-[400px] rounded-2xl border-[3px] border-[#7671a8]"
          src={urlForVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </>
  );
}
