import React, { useState, useRef } from "react";
import Movies from "./movies";
export const MyContext = React.createContext();
export default function Input() {
  const [swipe, setSwipe] = useState(false);
  const fetchButton = useRef(null);
  const inputField = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAuto = (e) => {
    if (e.key == "Enter") fetchButton.current.click();
  };
  const [errors, setErrors] = useState([]);
  const handler = () => {
    setErrors([]);
    if (inputValue.trim() === "") {
      setErrors(["No Empty Field Allowed!"]);
      inputField.current.focus()
      console.log(errors);
    } else {
      setSwipe(true);
    }
    // errors.length == 0 ? setSwipe(true) : "";

    console.log(errors);
  };
  return swipe ? (
    <MyContext.Provider value={{ errors, setErrors, setSwipe, inputField }}>
      <Movies KeyWord={inputValue} setKeyword={setInputValue} />
    </MyContext.Provider>
  ) : (
    <div className="my-[100px]">
      <label
        htmlFor="movie"
        className="text-lg font-mono me-[5px] capitalize sm:text-2xl"
      >
        Search for movies
      </label>
      <br />
      <input
        type="text"
        id="movie"
        onChange={handleChange}
        onKeyPress={handleAuto}
        ref={inputField}
        value={inputValue}
        className="mt-[15px] h-[35px] rounded-2xl sm:w-[230px] focus:outline-none focus:outline-[2px] focus:outline-[#7671a8] text-black ps-1 capitalize"
      />
      <br />
      <button
        ref={fetchButton}
        onClick={handler}
        className="border-[2px] p-1 sm:p-2 rounded-xl mt-[20px] hover:bg-[#7671a8] hover:font-medium transition"
      >
        Search
      </button>
      {errors &&
        errors.map((error, index) => (
          <p className="text-red-500 mt-3 sm:text-lg" key={index}>
            {error}
          </p>
        ))}
    </div>
  );
}
