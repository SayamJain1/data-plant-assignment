import { IoIosAddCircleOutline } from "react-icons/io";

type AddFormButton = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddFormButton({
  setShowForm,
  showForm,
}: AddFormButton) {
  return (
    <button
      onClick={() => setShowForm(!showForm)}
      className="relative flex text-white items-center px-2 gap-2 rounded-md bg-[#391E5A] hover:opacity-95"
    >
      <span>
        <IoIosAddCircleOutline size={20} />
      </span>
      ADD
    </button>
  );
}
