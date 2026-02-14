"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  //delete todo
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  //toggle complete
  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index] = newTodos[index] + " ✓";
    setTodos(newTodos);
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Todos saved to localStorage");
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">My Todo App</h1>
      <form onSubmit={addTodo} className="my-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a new todo"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex items-center justify-between my-2">
            <span>{todo}</span>
            <div>
              <button
                onClick={() => toggleComplete(index)}
                className="bg-green-500 text-white p-1 mr-2"
              >
                Mark as Done
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={saveToLocalStorage}
        className="bg-gray-500 text-white p-2 mt-4"
      >
        Save to Local Storage
      </button>
    </main>
  );
}
