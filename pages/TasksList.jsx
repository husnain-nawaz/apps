import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

const FILTERS = ["all", "active", "completed"];

export default function TasksList() {
  const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks();
  const [filter, setFilter] = useState("all");

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">All Tasks</h1>
        <p className="text-slate-400 text-sm mt-1">{tasks.length} total tasks</p>
      </div>

      {/* Add Task */}
      <div className="mb-6">
        <AddTask onAdd={addTask} />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 bg-slate-100 p-1 rounded-xl">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
              filter === f
                ? "bg-white text-violet-600 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
        filter={filter}
      />
    </div>
  );
}