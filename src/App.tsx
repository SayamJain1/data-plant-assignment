import { IoSearch } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddForm from "./components/AddForm";
import { useEffect, useState } from "react";
import SingleScheduel from "./components/SingleScheduel";
import { Routes, Route, Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { ScheduleProps } from "./types";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSingleScheduel, setShowSingleScheduel] = useState(false);
  const [data, setData] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleProps | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearchQuery, setResultSearchQuery] = useState(data);

  useEffect(() => {
    fetch("http://localhost:3030/schedules")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3030/schedules?title_like=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setResultSearchQuery(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery]);

  const handleDelete = (id: number) => {
    fetch(`http://localHost:3030/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
    window.location.reload();
  };

  // const handleEdit = (id: number) => {
  //   fetch(`http://localHost:3030/schedules/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({}),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  //   // window.location.reload();
  // };
  const handleEdit = (id: number) => {
    fetch(`http://localhost:3030/schedules/${id}`)
      .then((res) => res.json())
      .then((data) => setEditingSchedule(data));
    setShowForm(true);
  };

  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100">
      <div className="flex justify-between mt-4 mb-8">
        <div className="relative flex items-center w-72">
          <input
            type="text"
            className="relative h-10 w-full rounded-sm border border-gray-300 bg-white pl-4 pr-10 outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div className="absolute right-20 top-16">
            <AddForm
              id={editingSchedule ? editingSchedule.id : null}
              showForm
              setShowForm={setShowForm}
              initialData={editingSchedule}
            />
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
          {resultSearchQuery &&
            resultSearchQuery.map((d: ScheduleProps) => (
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
                    {d.repeat} {d.time}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 truncate ">
                    <button onClick={() => setShowSingleScheduel(true)}>
                      <Link to={`/singleScheduel/${d.id}`}>
                        <FaRegEye className=" hover:opacity-60" />
                      </Link>
                    </button>

                    <button
                      className="mx-2 relative"
                      onClick={() => handleEdit(d.id)}
                    >
                      <MdModeEdit className=" hover:opacity-60" />
                    </button>
                    <button onClick={() => handleDelete(d.id)}>
                      <RiDeleteBin6Line className=" hover:opacity-60" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          {showSingleScheduel && (
            <Routes>
              <Route
                path="/singleScheduel/:id"
                element={
                  <SingleScheduel
                    setShowSingleScheduel={setShowSingleScheduel}
                  />
                }
              />
            </Routes>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
