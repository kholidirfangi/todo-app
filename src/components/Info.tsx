import type Todo from "../types/todo";
import FilterTodos from "./FilterTodos";

interface InfoProps {
  todos: Todo[];
  onDeleteCompleted: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const Info = ({
  todos,
  onDeleteCompleted,
  activeFilter,
  setActiveFilter,
}: InfoProps) => {
  return (
    <div className="flex items-center justify-between bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue px-4 text-Dark-Grayish-Blue text-sm">
      <p>{`${todos.length} ${todos.length > 1 ? "items" : "item"}`}</p>
      <div className="invisible md:visible">
        <FilterTodos
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>
      <button
        onClick={onDeleteCompleted}
        className="hover:text-Light-Grayish-Blue cursor-pointer"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default Info;
