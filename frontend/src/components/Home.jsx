import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState(2024);
  const navigate = useNavigate();

  const searchHolidays = () => {
    navigate(`/holidays?country=${country}&year=${year}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-500 to-purple-600 mt-5">
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-center w-10/12 sm:w-3/4 md:w-2/5 lg:w-1/3">
        <h1 className="text-3xl font-bold text-white mb-3">Holiday Finder</h1>
        <p className="text-white text-base mb-5">
          Find official holidays for any country and year
        </p>

        {/* Responsive Form */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Country Selection (Responsive) */}
          <select
            className="bg-white py-3 px-4 rounded-lg shadow-md outline-none w-full max-w-xs text-sm"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="US">🇺🇸 United States</option>
            <option value="GB">🇬🇧 United Kingdom</option>
            <option value="IN">🇮🇳 India</option>
          </select>

          {/* Year Selection */}
          <input
            type="number"
            className="bg-white p-3 rounded-lg shadow-md outline-none w-full sm:w-1/2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button
          onClick={searchHolidays}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Search Holidays
        </button>
      </div>
    </div>
  );
};

export default Home;
