interface FilterTodosProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const FilterTodos = ({ activeFilter, setActiveFilter }: FilterTodosProps) => {
  const handleFilter = (active: string): void => {
    setActiveFilter(active);
  };

  return (
    <div className="flex gap-3 bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue px-4 text-Dark-Grayish-Blue text-sm text-center justify-center py-3 rounded-md">
      <p
        onClick={() => handleFilter("All")}
        className={`${
          activeFilter === "All"
            ? "text-blue-500"
            : "hover:text-Light-Grayish-Blue"
        } cursor-pointer`}
      >
        All
      </p>
      <p
        onClick={() => handleFilter("Active")}
        className={`${
          activeFilter === "Active"
            ? "text-blue-500"
            : "hover:text-Light-Grayish-Blue"
        } cursor-pointer`}
      >
        Active
      </p>
      <p
        onClick={() => handleFilter("Completed")}
        className={`${
          activeFilter === "Completed"
            ? "text-blue-500"
            : "hover:text-Light-Grayish-Blue"
        } cursor-pointer`}
      >
        Completed
      </p>
    </div>
  );
};

export default FilterTodos;
