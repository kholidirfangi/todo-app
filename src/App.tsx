import { useMemo, useState } from "react";
import { FilterTodos, Header, Info, InputTodo, TodoList } from "./components";
import type Todo from "./types/todo";
import { useTodos } from "./hooks/useTodos";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    todos,
    addTodo,
    toggleTodoCompleted,
    editTodo,
    deleteTodo,
    deleteCompleted,
    reorderTodos,
  } = useTodos();

  const filteredtodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      if (activeFilter === "Active") return !todo.completed;
      if (activeFilter === "Completed") return todo.completed;
      return todo;
    });
  }, [todos, activeFilter]);

  return (
    <main className="font-josefin-sans bg-Light-Grayish-Blue dark:bg-slate-900 min-h-screen">
      <picture>
        <source
          srcSet="./images/bg-desktop-dark.jpg"
          media="(min-width: 800px)"
        />
        <img
          className="w-full"
          src="./images/bg-mobile-dark.jpg"
          alt="background"
        />
      </picture>

      <div className="w-full absolute top-14 px-5">
        <div className="max-w-lg mx-auto">
          <Header isDark={isDark} setIsDark={setIsDark} />
          <InputTodo onAddTodo={addTodo} />
          <ul className="mt-5 rounded-md overflow-hidden">
            {todos.length > 0 ? (
              <>
                <TodoList
                  onReorder={reorderTodos}
                  todos={filteredtodos}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodoCompleted}
                />
                <Info
                  todos={filteredtodos}
                  onDeleteCompleted={deleteCompleted}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </>
            ) : (
              <li className="text-center text-Dark-Grayish-Blue py-5">
                No todos yet. Add a new todo!
              </li>
            )}
          </ul>
          <div className="mt-5 md:invisible">
            <FilterTodos
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </div>
        </div>
        <p className="text-center mt-10 text-Dark-Grayish-Blue">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
};

export default App;
