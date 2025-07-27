import type Todo from "../types/todo";

export const getTodosFromStorage = (): Todo[] => {
  try {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.log("Failed to get data", error);
    return [];
  }
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    return localStorage.setItem("todos", JSON.stringify(todos));
  } catch (error) {
    console.log("Failed to save todos", error);
  }
};
