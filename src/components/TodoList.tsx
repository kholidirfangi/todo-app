import { useState } from "react";
import type Todo from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onReorder: (todos: Todo[]) => void;
}

const TodoList = ({
  todos,
  onDelete,
  onToggle,
  onEdit,
  onReorder,
}: TodoListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [draggedTodo, setDraggedTodo] = useState<Todo | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleEditClick = (id: string, currentText: string) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleEditSubmit = (id: string) => {
    if (editedText.trim() !== "") {
      onEdit(id, editedText.trim());
      setEditingId(null);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, todo: Todo) => {
    setDraggedTodo(todo);
    e.dataTransfer.effectAllowed = "move";
    // Add some visual feedback
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    setDraggedTodo(null);
    setDragOverIndex(null);
    e.currentTarget.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    e.preventDefault();

    if (!draggedTodo) return;

    const dragIndex = todos.findIndex((todo) => todo.id === draggedTodo.id);

    if (dragIndex === dropIndex) return;

    const newTodos = [...todos];
    const draggedItem = newTodos.splice(dragIndex, 1)[0];
    newTodos.splice(dropIndex, 0, draggedItem);

    onReorder(newTodos);
    setDragOverIndex(null);
  };
  return (
    <>
      {todos.map((todo, index) => (
        <li
          key={todo.id}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, todo)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, index)}
          className={`group flex justify-between items-center bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue border-b-2 border-b-Light-Grayish-Blue dark:border-b-Very-Dark-Grayish-Blue py-1 ${
            dragOverIndex === index
              ? "bg-gradient-to-br from-cyan-400 to-purple-500"
              : ""
          }
              ${draggedTodo?.id === todo.id ? "opacity-50" : "opacity-100"}`}
        >
          <div className="relative ml-4 flex items-center w-full">
            {/* Circle Shape Start */}
            <div
              className="absolute h-[26px] w-[26px] rounded-full bg-Light-Grayish-Blue dark:bg-Very-Dark-Grayish-Blue group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-purple-500 -left-[1px] 
            "
            ></div>
            <input
              type="checkbox"
              id="todo-checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="peer w-6 h-6 z-10 appearance-none rounded-full bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue checked:bg-gradient-to-br checked:from-cyan-400 checked:to-purple-500"
            />
            <img
              src="./images/icon-check.svg"
              alt="Check"
              className="absolute top-[14px] left-[6px] w-3 h-3 z-10 pointer-events-none opacity-0 peer-checked:opacity-100"
            />
            {/* Circle Shape End */}
            {editingId === todo.id ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={() => handleEditSubmit(todo.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSubmit(todo.id);
                }}
                className="w-full mx-3 text-Light-Grayish-Blue px-1 rounded-sm"
                autoFocus
              />
            ) : (
              <div className="ml-2 text-Dark-Grayish-Blue dark:text-Light-Grayish-Blue peer-checked:line-through  peer-checked:text-Light-Grayish-Blue dark:peer-checked:text-Dark-Grayish-Blue py-2">
                {todo.text}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center gap-2">
            {/* Edit Icon Start */}
            <button
              onClick={() => handleEditClick(todo.id, todo.text)}
              className="cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-200 mt-1"
            >
              <img src="./images/icon-edit.svg" alt="" className="mr-3" />
            </button>
            {/* Edit Icon End */}
            {/* Cross Icon Start*/}
            <button
              onClick={() => onDelete(todo.id)}
              className="cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-200"
            >
              <img src="./images/icon-cross.svg" alt="" className="mr-5" />
            </button>
            {/* Cross Icon End*/}
          </div>
        </li>
      ))}
    </>
  );
};

export default TodoList;
