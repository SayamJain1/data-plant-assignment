import { IoSearch } from "react-icons/io5";
type InputProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};
export default function Input({ searchQuery, setSearchQuery }: InputProps) {
  return (
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
  );
}
