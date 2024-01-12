import { useEffect, useState } from "react";
import { ScheduleProps } from "../types";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday ",
  "Saturday ",
];

type AddFormProps = {
  id: number | null;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?: ScheduleProps | null;
};
export default function AddForm({
  id,
  setShowForm,
  showForm,
  initialData,
}: AddFormProps) {
  const [fields, setFields] = useState({
    title: "",
    description: "",
    subject: "",
    frequency: "",
    repeat: "",
    time: "",
  });
  const [checkedDay, setCheckedDay] = useState("");

  const handleClick = (day: string) => {
    setFields({
      ...fields,
      repeat: day,
    });
    setCheckedDay(day);
  };

  useEffect(() => {
    if (initialData) {
      setFields(initialData);
      setCheckedDay(initialData.repeat || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = id
      ? `http://localhost:3030/schedules/${id}`
      : "http://localhost:3030/schedules";
    const method = id ? "PATCH" : "POST";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fields,
        id: id || Date.now(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setFields({
      title: "",
      description: "",
      subject: "",
      frequency: "",
      repeat: "",
      time: "",
    });
    setCheckedDay("");
    window.location.reload();
    setShowForm(!showForm);
  };

  return (
    <div className=" w-[400px] bg-white p-3 rounded-md shadow-lg border border-gray-100">
      <h2 className="mb-7 text-xl font-medium">Add Schedule</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-between">
          <label>Title</label>
          <input
            value={fields.title}
            onChange={(e) => setFields({ ...fields, title: e.target.value })}
            required
            type="text"
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Description</label>
          <textarea
            value={fields.description}
            onChange={(e) =>
              setFields({ ...fields, description: e.target.value })
            }
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Subject</label>
          <input
            value={fields.subject}
            onChange={(e) => setFields({ ...fields, subject: e.target.value })}
            required
            type="text"
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          />
        </div>
        <div className="flex justify-between">
          <label>Frequency</label>
          <select
            value={fields.frequency}
            onChange={(e) =>
              setFields({ ...fields, frequency: e.target.value })
            }
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          >
            <option disabled></option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        {fields.frequency === "weekly" && (
          <div className="flex justify-between">
            <label>Repeat</label>
            <div className="flex justify-evenly w-3/5">
              {days.map((day, i) => (
                <>
                  <label
                    key={i}
                    className={` hover:bg-gray-300 font-medium text-xs py-1 px-2 rounded-full border border-gray-300 ${
                      checkedDay === day ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleClick(day)}
                    htmlFor={`${i}`}
                  >
                    {day[0]}
                  </label>
                  <input
                    className="hidden"
                    type="radio"
                    id={`day-${i}`}
                    name="days"
                    value={day}
                    checked={fields.repeat === day}
                    onChange={() => {}}
                  />
                </>
              ))}
            </div>
          </div>
        )}

        {fields.frequency === "monthly" && (
          <div className="flex justify-between">
            <label>Repeat</label>
            <select
              value={fields.repeat}
              onChange={(e) => setFields({ ...fields, repeat: e.target.value })}
              className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
            >
              <option value="first_monday">First Monday</option>
              <option value="second_saturday">Second Satruday</option>
              <option value="every_sunday">Every Sunday</option>
            </select>
          </div>
        )}
        <div className="flex justify-between">
          <label>Time </label>
          <select
            value={fields.time}
            onChange={(e) => setFields({ ...fields, time: e.target.value })}
            required
            className="p-1 rounded-md border pl-2 border-gray-300 bg-white outline-none  w-3/5"
          >
            <option value="10AM">10:00AM</option>
            <option value="12AM">12:00AM</option>
            <option value="2AM">02:00AM</option>
          </select>
        </div>
        <div className="flex flex-row-reverse gap-4">
          <button
            type="submit"
            className="bg-[#391E5A] text-white rounded-md py-2 px-4"
          >
            {id ? "Update" : "Done"}
          </button>
          <button
            onClick={() => setShowForm(false)}
            className="bg-gray-200 rounded-md py-2 px-4"
          >
            Cancle
          </button>
        </div>
      </form>
    </div>
  );
}
