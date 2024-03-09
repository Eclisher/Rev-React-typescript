
import { useState } from "react";
import { Task } from "./Task";
import { nanoid } from "nanoid";

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );

    setTasks(newTasks);
  };
  const addTask = (): void => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => [...prev, newTask]);
    setTitle("");
  };

  const handleSearch = (searchKeyword: string): void => {
    setSearchKeyword(searchKeyword);
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    tasks,
    searchKeyword,
    title,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
    setTitle,
  };
};