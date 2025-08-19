import { motion } from "motion/react";
import { useSearch } from "../hooks/useSearch";

export const Search = () => {
  const { searchByDescription, setSearchByDescription } = useSearch();

  return (
    <>
      <motion.input
        whileHover={{ width: "300px" }}
        type="text"
        className="bg-[#1a1a1a] p-2 rounded focus:outline-none"
        placeholder="Search by description"
        value={searchByDescription}
        onChange={(e) => setSearchByDescription(e.target.value)}
      />
    </>
  );
};
