import { useProductStore } from "../store/useProductStore";
import { AnimatePresence, motion, Reorder } from "motion/react";
import { Search } from "./Search";
import { useProductsList } from "../hooks/useProductsList";

export const ProductsList = () => {
  const titles = [
    { value: "Description" },
    { value: "Status" },
    { value: "Actions", styles: "text-center" },
  ];

  const { data, setOrderProducts } = useProductsList();
  const { setSelectedProduct, removeProduct } = useProductStore();

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <div className="lg:col-span-2">
        <div className="text-end space-x-1 mb-2">
          <Search />
        </div>

        <motion.div
          layout
          transition={{
            duration: 0.5,
          }}
          className="overflow-x-auto"
        >
          <table className="w-full text-left table-auto rounded-lg shadow-lg bg-[#1a1a1a]">
            <thead>
              <tr className="text-white bg-[#212121] border-b border-gray-700">
                {titles.map((title, index) => (
                  <th
                    key={index}
                    className={`px-6 py-4 text-sm font-semibold text-gray-400 ${title.styles}`}
                  >
                    {title.value}
                  </th>
                ))}
              </tr>
            </thead>
            <Reorder.Group
              as="tbody"
              axis="y"
              values={data}
              onReorder={setOrderProducts}
            >
              <AnimatePresence>
                {data.map((p) => (
                  <Reorder.Item
                    as="tr"
                    value={p}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      translateX: "-105%",
                      transition: {
                        duration: 0.7,
                      },
                    }}
                    key={p.id}
                    className="text-gray-300 hover:bg-[#242424] border-b border-zinc-700"
                  >
                    <td className="px-6 py-4">{p.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          p.completed ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {p.completed ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="flex flex-wrap gap-2 justify-center px-6 py-4">
                      <button
                        onClick={() => setSelectedProduct(p.id)}
                        className="bg-green-600/80 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600/50 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeProduct(p.id)}
                        className="bg-red-600/80 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600/50 transition duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </table>
        </motion.div>
      </div>
    </>
  );
};
