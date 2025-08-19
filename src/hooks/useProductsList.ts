import { useEffect, useState } from "react";
import { IProduct, useProductStore } from "../store/useProductStore";

export const useProductsList = () => {
  const [data, setData] = useState<IProduct[]>([]);

  const { init, products, setOrderProducts, isFiltered, filteredProducts } =
    useProductStore();

  useEffect(() => {
    init();
    setData(products);
  }, [init]);

  useEffect(() => {
    if (isFiltered) {
      setData(filteredProducts);
    } else {
      setData(products);
    }
  }, [isFiltered, products, filteredProducts]);

  return {
    data,
    setOrderProducts,
  };
};
