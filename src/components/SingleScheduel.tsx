import React, { useEffect, useState } from "react";
import { ScheduleProps } from "../types";
import { useNavigate, useParams } from "react-router-dom";

type SingleScheduelProps = {
  setShowSingleScheduel: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SingleScheduel({
  setShowSingleScheduel,
}: SingleScheduelProps) {
  const [data, setData] = useState<ScheduleProps | null>(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const closePage = () => {
    navigate(-1);
    setShowSingleScheduel(false);
  };

  useEffect(() => {
    fetch(`http://localhost:3030/schedules/${id}`)
      .then((response) => response.json())
      .then((scheduleData) => {
        setData(scheduleData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="absolute top-8 right-3  bottom-8 left-3 z-10 bg-white p-4 rounded-lg shadow-md">
      <div className="bg-gray-50 p-2 w-1/2 rounded-md shadow-md h-full mx-auto">
        <button onClick={closePage}>&#10006;</button>
        {data ? (
          <>
            <div>
              <h1 className=" my-5 text-center font-medium text-2xl">
                {data.title}
              </h1>
              <p className="text-center">Subject: {data.subject}</p>
              <p className=" text-center my-5">{data.description}</p>
              <p className="mx-auto p-2 bg-slate-100 w-fit rounded-md">
                Scheduled: {data.repeat} {data.time}
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center">Loading...</div>
        )}
      </div>
    </div>
  );
}
