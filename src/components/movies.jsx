import { useContext, useEffect, useState } from "react";
import { MyContext } from "./input";
import { apiKey, youtubApiKey } from "../apiKey";
import Trailer from "./trailer";
export default function Movies({ KeyWord, setKeyword }) {
  const values = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [youtubeUrl, setYoutubUrl] = useState("");
  const [showtrailer, setShowTrailer] = useState(false);
  const [infos, setInfos] = useState([
    {
      Title: "",
      Plote: "",
      Poster: "",
      Rating: "",
      Genre: "",
      Year: "",
    },
  ]);
  const trailerHandler = async (title, year) => {
    const query = `${title} ${year} trailer`;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&key=${youtubApiKey}`
    );
    if (!response.ok) {
      throw new Error("Bad Api Response !");
    }
    const data = await response.json();
    if (data.items.length > 0) {
      setYoutubUrl(`https://www.youtube.com/embed/${data.items[0].id.videoId}`);
      console.log(youtubeUrl);
      setToken(false);
      setShowTrailer(true);
    }
  };
  const backButton = () => {
    values.setSwipe(false);
    setKeyword("");
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response =
          await fetch(`http://www.omdbapi.com/?s=${KeyWord}}&apikey=${apiKey}
`);
        if (!response.ok) {
          throw new Error("Bad Answer from Database!");
        }
        const data = await response.json();
        console.log(apiKey);
        if (data.Response == "False") {
          values.setErrors([`No movie nor tv show was found!`]);
          values.setSwipe(false);
        }
        if (data.Search) {
          setInfos([...data.Search]);
          setToken(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [KeyWord]);

  return (
    <>
      {values.errors &&
        values.errors.map((error, index) => <p key={index}>{error}</p>)}
      {loading && (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-xl sm:text-2xl">Loading...</p>
        </div>
      )}
      {token && (
        <div className="">
          <div className="flex justify-start p-2">
            <button
              onClick={backButton}
              className="border-[#7671a8] border-[2px] p-1 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-[#7671a8] transition cursor-pointer text-lg sm:text-xl"
            >
              Home
            </button>
          </div>
          <div className="flex justify-center">
            <div className=" grid gap-[10px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {infos.map((data, ind) => (
                <div key={ind} className="w-fit  p-2">
                  <img
                    src={
                      data.Poster == "N/A"
                        ? "/src/pictures/notFound.jpg"
                        : data.Poster
                    }
                    alt=""
                    className="w-[400px]  h-[500px] rounded-t-xl"
                  />
                  <div className="text-center border-[1px] p-1 border-zinc-500 rounded-b-xl bg-[#7671a8] text-lg sm:text-xl sm:p-2">
                    <div className="flex justify-between items-center">
                      <h1 className="">
                        {data.Title} ({data.Year})
                      </h1>
                      <button
                        onClick={() => trailerHandler(data.Title, data.Year)}
                        className="border-[2px] border-white p-1 sm:p-2 rounded-xl mx-2 hover:bg-[#252331] hover:text-white transition"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showtrailer && <Trailer urlForVideo={youtubeUrl} />}
    </>
  );
}
