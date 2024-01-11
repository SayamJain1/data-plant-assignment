import { IoSearch } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";

function App() {
  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100">
      <div className="flex justify-between">
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

        <button className="flex text-white items-center px-2 gap-2 rounded-md bg-[#391E5A] hover:opacity-95">
          <span>
            <IoIosAddCircleOutline size={20} />
          </span>
          ADD
        </button>
      </div>

      <div className="">
        <table className="w-full  border border-gray-300">
          <thead>
            <tr className="  bg-[#D8D2DE]">
              <th className="text-left text-gray-600 py-3 px-6">Title</th>
              <th className="text-left text-gray-600 py-3 px-6">Description</th>
              <th className="text-left text-gray-600 py-3 px-6">Subject</th>
              <th className="text-left text-gray-600 py-3 px-6">Schedule</th>
              <th className="text-left text-gray-600 py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="py-3 px-6 border-b border-gray-200">
                Sample Title
              </td>
              <td className="py-3 px-6 border-b border-gray-200 truncate max-w-96 text-wrap">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident dignissimos rerum minus soluta nam voluptates, deserunt beatae rem ab culpa quaerat voluptas perferendis doloremque laudantium odit praesentium, fugiat tempora? Quam!
              </td>
              <td className="py-3 px-6 border-b border-gray-200">
                555-555-5555
              </td>
              <td className="py-3 px-6 border-b border-gray-200">Active</td>
              <td className="py-3 px-6 border-b border-gray-200">Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
