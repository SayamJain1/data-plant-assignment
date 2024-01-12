import AddForm from "./components/AddForm";
import { useEffect, useState } from "react";
import { ScheduleProps } from "./types";
import Table from "./components/Table";
import AddFormButton from "./components/AddFomButton";
import Input from "./components/Input";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showSingleScheduel, setShowSingleScheduel] = useState(false);
  const [data, setData] = useState<ScheduleProps[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleProps | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [resultSearchQuery, setResultSearchQuery] =
    useState<ScheduleProps[]>(data);

  useEffect(() => {
    fetch("http://localhost:3030/schedules")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3030/schedules?title_like=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setResultSearchQuery(data))
      .catch((error) => console.log(error));
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

  const handleEdit = (id: number) => {
    fetch(`http://localhost:3030/schedules/${id}`)
      .then((res) => res.json())
      .then((data) => setEditingSchedule(data));
    setShowForm(true);
  };

  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100">
      <div className="flex justify-between mt-4 mb-8">
        <Input searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <AddFormButton setShowForm={setShowForm} showForm={showForm} />
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

      <Table
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        resultSearchQuery={resultSearchQuery}
        showSingleScheduel={showSingleScheduel}
        setShowSingleScheduel={setShowSingleScheduel}
      />
    </div>
  );
}

export default App;
