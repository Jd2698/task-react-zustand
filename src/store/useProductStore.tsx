import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";
import { filterAndSortProducts } from "../utils/product.utils";

export interface ICreateProduct {
  description: string;
  completed: boolean;
}

export interface IProduct extends ICreateProduct {
  id: string;
}

interface ProductsState {
  products: IProduct[];
  isFiltered: boolean;
  setIsFiltered: (filter: boolean) => void;
  filteredProducts: IProduct[];
  addFilter: (filters?: { description?: string }) => void;
  selectedProduct: IProduct | undefined;
  addProduct: (product: ICreateProduct) => void;
  updateProduct: (product: IProduct) => void;
  setSelectedProduct: (id: string | undefined) => void;
  removeProduct: (id: string) => void;
  setOrderProducts: (products: IProduct[]) => void;
  init: () => void;
}

export const useProductStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      isFiltered: false,
      selectedProduct: undefined,

      setOrderProducts: (products: IProduct[]) => {
        set(() => ({ products: [...products] }));
      },

      setIsFiltered: (filter: boolean) => {
        set(() => ({ isFiltered: filter }));
      },

      addFilter: (filters?: { description?: string }) => {
        const allProducts = get().products;

        const filtered = filterAndSortProducts(allProducts, filters);

        set(() => ({ filteredProducts: filtered, isFiltered: true }));
      },

      addProduct: ({ description, completed }) => {
        const data: IProduct = {
          id: uuidv4(),
          description,
          completed,
        };

        set((state) => ({ products: [...state.products, data] }));
      },

      setSelectedProduct: (id: string | undefined) => {
        const { products } = get();
        const selectedProduct = id
          ? products.find((p) => p.id === id)
          : undefined;

        set({ selectedProduct });
      },

      updateProduct: (product: IProduct) =>
        set((state) => ({
          products: state.products.map((p) =>
            product.id === p.id ? { ...p, ...product } : p
          ),
        })),

      removeProduct: (id: string) =>
        set((state) => ({
          products: state.products.filter((p) => p.id != id),
        })),

      init: () => {
        const { products } = get();

        if (products.length === 0) {
          const defaultProducts: IProduct[] = [
            {
              id: uuidv4(),
              description: "example",
              completed: false,
            },
            {
              id: uuidv4(),
              description: "example2",
              completed: true,
            },
          ];

          set({ products: defaultProducts });
        }
      },
    }),
    { name: "products-storage" }
  )
);
