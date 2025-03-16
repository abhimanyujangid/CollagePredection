import {  Search } from "lucide-react";
import { Link } from "react-router-dom";

const HeroUpper = () => {
  return (
    <div className="mt-16 text-center container ">
      <h1 className="text-3xl md:text-5xl font-bold lg:text-6xl  mx-auto">
        Find Your <span className="text-blue-500">Perfect College</span> &{" "}
        <br />
        <span className="text-blue-500">Stream</span>
      </h1>
      <p className="text-gray-400 mt-6 text-lg sm:text-xl">
        Get AI-powered personalized recommendations based on your profile and
        preferences.
      </p>
      <div className="mt-9 flex flex-col items-center sm:flex-row gap-4 sm:gap-6  justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          to="/auth"
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center  border border-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Get Started
        </Link>
        <Link
          to={""}
          className="px-8 py-3 bg-white hover:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-blue-500 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-blue-100 dark:border-neutral-700 "
        >
          <Search className="mr-2" size={18} /> Explore Colleges
        </Link>
      </div>
    </div>
  );
};

export default HeroUpper;
