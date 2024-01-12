import { Link, Route, Routes } from "react-router-dom";
import { ScheduleProps } from "../types";
import { FaRegEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import SingleScheduel from "./SingleScheduel";

type TableProps = {
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  resultSearchQuery: ScheduleProps[];
  showSingleScheduel: boolean;
  setShowSingleScheduel: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Table({
  handleDelete,
  handleEdit,
  resultSearchQuery,
  showSingleScheduel,
  setShowSingleScheduel,
}: TableProps) {
  return (
    <div className=" h-[400px] overflow-y-auto">
      <table className="w-full border border-gray-300 ">
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
            <tbody key={d.id} className="bg-white">
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
                  {d.repeat && d.time
                    ? `${d.repeat} ${d.time}`
                    : `Daily ${d.time}`}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 truncate ">
                  <button onClick={() => setShowSingleScheduel(true)}>
                    <Link to={`/singleScheduel/${d.id}`}>
                      <FaRegEye className=" hover:opacity-60" />
                    </Link>
                  </button>

                  <button className="mx-2" onClick={() => handleEdit(d.id)}>
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
                <SingleScheduel setShowSingleScheduel={setShowSingleScheduel} />
              }
            />
          </Routes>
        )}
      </table>
    </div>
  );
}
