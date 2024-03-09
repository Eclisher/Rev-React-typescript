import React, { useState } from "react";
import { Task } from "./Task";
import { nanoid } from "nanoid";
import "./TaskManager.css";

export const TaskManager: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks = tasks.slice();

    const index = tasks.findIndex((task) => task.id === id);

    newTasks[index] = { ...newTasks[index], ...taskUpdate };

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

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks: Task[] = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateTask(task.id, { title: e.target.value })
                }
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
