import type Todo from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TodoList = ({ todos, onDelete, onToggle }: TodoListProps) => {
  return (
    <>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center bg-Very-Dark-Desaturated-Blue py-3 border-b-2 border-b-Very-Dark-Grayish-Blue"
        >
          <div className="relative ml-4 flex">
            {/* Circle Shape Start */}
            <input
              type="checkbox"
              id="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="peer w-6 h-6 appearance-none rounded-full border-2 border-Very-Dark-Grayish-Blue checked:bg-gradient-to-br checked:from-cyan-400 checked:to-purple-500"
            />
            <img
              src="./images/icon-check.svg"
              alt="Check"
              className="absolute top-[6px] left-[6px] w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100"
            />
            {/* Circle Shape End */}
            <div className="ml-2 text-Dark-Grayish-Blue peer-checked:line-through">
              {todo.text}
            </div>
          </div>
          {/* Cross Icon Start*/}
          <button onClick={() => onDelete(todo.id)} className="cursor-pointer">
            <img src="./images/icon-cross.svg" alt="" className="mr-3" />
          </button>
          {/* Cross Icon End*/}
        </li>
      ))}
    </>
  );
};

export default TodoList;
