import { useEffect, useReducer } from "react";
import { getTodosFromStorage, saveTodosToStorage } from "../utils/storage";
import type Todo from "../types/todo";

type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "DELETE_COMPLETED" };

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

    case "SET_TODOS":
      return action.payload;

    case "DELETE_COMPLETED":
      return state.filter((todo) => !todo.completed);

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
  const deleteTodo = (id: string) =>
    dispatch({ type: "DELETE_TODO", payload: id });
  const deleteCompleted = () => dispatch({ type: "DELETE_COMPLETED" });

  return {
    todos,
    addTodo,
    toggleTodoCompleted,
    deleteTodo,
    deleteCompleted,
  };
};
