import { useContext, useEffect, useState } from "react";
import { MyContext } from "./input";
import { apiKey } from "../apiKey";
export default function Movies({ KeyWord, setKeyword }) {
  const values = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [infos, setInfos] = useState([
    {
      Title: "",
      Plote: "",
      Poster: "",
      Rating: "",
      Genre: "",
      Year: "",
      RunTime: "",
    },
  ]);
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
                  <h1 className="text-center border-[1px] p-1 border-zinc-500 rounded-b-xl bg-[#7671a8] text-lg sm:text-2xl sm:p-2">
                    {data.Title}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
