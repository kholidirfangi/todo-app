import { useState } from "react";

interface InputTodoProps {
  onAddTodo: (text: string) => void;
}

const InputTodo = ({ onAddTodo }: InputTodoProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() === "") return; // Check if empty
    onAddTodo(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute my-3 ml-4 w-6 h-6 rounded-full bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue border-[1px] border-Light-Grayish-Blue dark:border-Very-Dark-Grayish-Blue z-10"></div>
      <input
        type="text"
        placeholder="Create a new todo.."
        value={inputValue}
        onChange={handleChange}
        className="w-full text-Very-Dark-Grayish-Blue dark:text-Dark-Grayish-Blue bg-Very-Light-Gray dark:bg-Very-Dark-Desaturated-Blue p-3 rounded-md pl-12 outline-0"
      />
    </form>
  );
};

export default InputTodo;
