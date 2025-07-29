import { useEffect, useReducer } from "react";
import { getTodosFromStorage, saveTodosToStorage } from "../utils/storage";
import type Todo from "../types/todo";

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "EDIT_TODO"; payload: { id: string; text: string } }
  | { type: "DELETE_COMPLETED" }
  | { type: "REORDER_TODOS"; payload: Todo[] };

// Reducer Function
const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: String(Date.now()), text: action.payload, completed: false },
      ];

    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "DELETE_COMPLETED":
      return state.filter((todo) => !todo.completed);

    case "REORDER_TODOS":
      return action.payload;

    default:
      return state;
  }
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    // Lazy initializer untuk memuat state awal dari localStorage
    return getTodosFromStorage();
  });

  //   Efek samping untuk menyimpan todos ke localStorange setiap kali diupdate
  useEffect(() => {
    saveTodosToStorage(todos);
  }, [todos]);

  //   Fungsi-fungsi pembantu untuk mengirim aksi ke reducer
  const addTodo = (text: string) =>
    dispatch({ type: "ADD_TODO", payload: text });
  const toggleTodoCompleted = (id: string) =>
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });
  const editTodo = (id: string, newText: string) => {
    dispatch({ type: "EDIT_TODO", payload: { id, text: newText } });
  };

  const deleteTodo = (id: string) => {
    const isConfirm = window.confirm("Are you sure to delete this todo?");

    if (isConfirm) {
      dispatch({ type: "DELETE_TODO", payload: id });
    }
  };

  const deleteCompleted = () => {
    const isConfirm = window.confirm(
      "Are you sure to delete these completed todos?"
    );
    if (isConfirm) {
      dispatch({ type: "DELETE_COMPLETED" });
    }
  };
  const reorderTodos = (reorderedTodos: Todo[]) =>
    dispatch({ type: "REORDER_TODOS", payload: reorderedTodos });

  return {
    todos,
    addTodo,
    toggleTodoCompleted,
    editTodo,
    deleteTodo,
    deleteCompleted,
    reorderTodos,
  };
};
