import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HolidayModal from "./HolidayModal";
import NoDataImage from "../assets/no-data.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [month, setMonth] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [holidayType, setHolidayType] = useState("");
  const itemsPerPage = 12;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const country = queryParams.get("country") || "US";
  const year = queryParams.get("year") || "2024";

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/holidays?country=${country}&year=${year}`
        );
        let fetchedHolidays = response.data;

        if (month) {
          fetchedHolidays = fetchedHolidays.filter((holiday) =>
            holiday.date.iso.startsWith(`${year}-${month}`)
          );
        }

        if (searchQuery) {
          fetchedHolidays = fetchedHolidays.filter((holiday) =>
            holiday.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        if (startDate && endDate) {
          fetchedHolidays = fetchedHolidays.filter((holiday) => {
            const holidayDate = new Date(holiday.date.iso);
            return holidayDate >= startDate && holidayDate <= endDate;
          });
        }

        if (holidayType) {          
          fetchedHolidays = fetchedHolidays.filter((holiday) =>
            holiday.type.includes(holidayType)
          );
        }

        setHolidays(fetchedHolidays);
      } catch (err) {
        setError("Failed to fetch holidays");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, [country, year, month, searchQuery, startDate, endDate, holidayType]);

  if (loading) return <p className="text-center text-lg">Loading holidays...</p>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <img src={NoDataImage} alt="Error" className="w-50 h-40 mb-4" />
        <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
      </div>
    );

  const totalPages = Math.ceil(holidays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedHolidays = holidays.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
            <div className="flex justify-center mb-4">
        <h2 className="text-2xl font-bold mb-4 mr-5 mt-2 text-center">
          Holidays for {country} - {year}
        </h2>
        <select
          className="bg-white p-3 rounded-lg shadow-md outline-none mb-5"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {[
            { value: "01", name: "January" },
            { value: "02", name: "February" },
            { value: "03", name: "March" },
            { value: "04", name: "April" },
            { value: "05", name: "May" },
            { value: "06", name: "June" },
            { value: "07", name: "July" },
            { value: "08", name: "August" },
            { value: "09", name: "September" },
            { value: "10", name: "October" },
            { value: "11", name: "November" },
            { value: "12", name: "December" },
          ].map((m) => (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search holidays..."
          className="p-2 border rounded shadow-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="p-2 border rounded shadow-md"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
          className="p-2 border rounded shadow-md"
        />

        <select
          className="p-2 border rounded shadow-md"
          value={holidayType}
          onChange={(e) => setHolidayType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="National holiday">National</option>
          <option value="Local holiday">Local</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedHolidays.map((holiday, index) => (
          <div
            key={index}
            className="bg-white p-4 shadow-lg rounded-lg hover:shadow-xl cursor-pointer transition duration-300 transform hover:scale-105"
            onClick={() => setSelectedHoliday(holiday)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{holiday.name}</h3>
            <p className="text-gray-600 text-sm">
              <strong>Date:</strong> {holiday.date.iso}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              <strong>Type:</strong> {holiday.type?.join(", ")}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedHoliday && (
        <HolidayModal selectedHoliday={selectedHoliday} closeModal={() => setSelectedHoliday(null)} />
      )}
    </div>
  );
};

export default HolidayList;
