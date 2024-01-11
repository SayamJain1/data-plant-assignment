import { IoSearch } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddForm from "./components/AddForm";
import { useEffect, useState } from "react";

type ScheduleProps = {
  id: string;
  title: string;
  description: string;
  subject: string;
  schedule: string;
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3030/schedules")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100">
      <div className="flex justify-between mt-4 mb-8">
        <div className="relative flex items-center w-72">
          <input
            type="text"
            className="relative h-10 w-full rounded-sm border border-gray-300 bg-white pl-4 pr-10 outline-none"
            placeholder="Search"
          />
          <span className=" absolute right-2">
            <IoSearch size={20} color="#391E5A" />
          </span>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="relative flex text-white items-center px-2 gap-2 rounded-md bg-[#391E5A] hover:opacity-95"
        >
          <span>
            <IoIosAddCircleOutline size={20} />
          </span>
          ADD
        </button>
        {showForm && (
          <div className="absolute right-20  top-16">
            <AddForm />
          </div>
        )}
      </div>

      <div className="">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="  bg-[#D8D2DE]">
              <th className="text-left text-gray-600 py-3 px-6">Title</th>
              <th className="text-left text-gray-600 py-3 px-6">Description</th>
              <th className="text-left text-gray-600 py-3 px-6">Subject</th>
              <th className="text-left text-gray-600 py-3 px-6">Schedule</th>
              <th className="text-left text-gray-600 py-3 px-6">Actions</th>
            </tr>
          </thead>
          {data &&
            data.map((d: ScheduleProps) => (
              <tbody key={d.id} className="bg-white ">
                <tr>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {d.title}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate max-w-96 ">
                    {d.description}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {d.subject}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    {d.schedule}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate">
                    Active
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}

export default App;
