import React, { useRef } from "react";
import { API_OPTIONS, BG_IMG_URL } from "../utils/Constants";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/" +
        movie +
        "?include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ".Only give me names of 5 movies, comma separated like the example resut given ahead. Example result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults) {
      //error
    }
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
  };
  return (
    <>
      <div className="absolute -z-10">
        <img src={BG_IMG_URL} alt="background img" />
      </div>

      <div className="pt-[10%] flex justify-center">
        <form
          className=" w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 rounded-md col-span-9"
            placeholder={lang[langKey].gptSearchPlaceholder}
          ></input>

          <button
            className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-lg "
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GptSearchBar;
