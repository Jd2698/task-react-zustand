import { useEffect, useState } from "react";
import { useProductStore } from "../store/useProductStore";

export const useSearch = () => {
  const [searchByDescription, setSearchByDescription] = useState("");
  const { addFilter, setIsFiltered } = useProductStore();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchByDescription === "") {
        setIsFiltered(false);
      } else {
        addFilter({ description: searchByDescription });
      }
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchByDescription]);

  return {
    searchByDescription,
    setSearchByDescription,
  };
};
