import React from "react";

function SubmitButton() {
  return (
    <div className="md:col-span-1 flex items-end justify-end">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </div>
  );
}

export default SubmitButton;
