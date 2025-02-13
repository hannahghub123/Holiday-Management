const HolidayModal = ({ selectedHoliday, closeModal }) => {
  if (!selectedHoliday) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          ✖
        </button>
        <h3 className="text-xl font-bold mb-2">{selectedHoliday.name}</h3>
        <p className="text-gray-600">
          <strong>Date:</strong> {selectedHoliday.date.iso}
        </p>
        <p className="text-gray-600">
          <strong>Type:</strong> {selectedHoliday.type?.join(", ")}
        </p>
        {selectedHoliday.description && (
          <p className="text-gray-700 mt-2">{selectedHoliday.description}</p>
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HolidayModal;
