export default function AddForm() {
//   const days = ["S", "M", "T", "W", "T", "F", "S"];
//   const handleClick = () => {
//     console.log("cl");
//   };
  return (
    <div className=" w-[400px] bg-white p-3 rounded-md shadow-lg border border-gray-100">
      <h1 className="mb-7 text-xl font-medium">Add Schedule</h1>
      <form className="flex flex-col gap-4">
        <div className="flex justify-between">
          <label>Title</label>
          <input
            required
            type="text"
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Description</label>
          <textarea
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Subject</label>
          <input
            required
            type="text"
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Frequency</label>
          <select
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div className="flex justify-between">
          <label>Repeat</label>
          {/* <div className="flex justify-evenly w-3/5">
            {days.map((day, i) => (
              <div key={i} className=" font-medium text-xs py-1 px-2 rounded-full border border-gray-300">
                <label onClick={handleClick} htmlFor={`${i}`}>
                  {day}
                </label>
                <input
                  className="hidden"
                  type="radio"
                  id={`${i}`}
                  name="days"
                  value={day}
                />
              </div>
            ))}
          </div> */}

          {/* OR  */}
          {/* {
            <select className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5">
              <option value="first_monday">First Monday</option>
              <option value="second_saturday">Second Satruday</option>
              <option value="every_sunday">Every Sunday</option>
            </select>
          } */}
        </div>
        <div className="flex justify-between">
          <label>Time </label>
          <select
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          >
            <option value="10AM">10:00AM</option>
            <option value="12AM">12:00AM</option>
            <option value="2AM">02:00AM</option>
          </select>
        </div>
        <div className="flex flex-row-reverse gap-4">
          <button className="bg-[#391E5A] text-white rounded-md py-2 px-4">
            Done
          </button>
          <button className="bg-gray-200 rounded-md py-2 px-4">Cancle</button>
        </div>
      </form>
    </div>
  );
}
