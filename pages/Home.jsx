import { useTasks } from "../hooks/useTasks";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

export default function Home({ setCurrentPage }) {
  const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks();

  const pending = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
        <p className="text-slate-400 text-sm mt-1">
          {pending} pending · {completed} done
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-violet-50 rounded-xl p-4">
          <p className="text-2xl font-bold text-violet-600">{pending}</p>
          <p className="text-xs text-violet-400 mt-0.5">Pending</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-600">{completed}</p>
          <p className="text-xs text-emerald-400 mt-0.5">Completed</p>
        </div>
      </div>

      {/* Add Task */}
      <div className="mb-6">
        <AddTask onAdd={addTask} />
      </div>

      {/* Recent Tasks (show only 5 on home) */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Recent</h2>
        {tasks.length > 5 && (
          <button
            onClick={() => setCurrentPage("tasks")}
            className="text-xs text-violet-600 hover:underline"
          >
            View all →
          </button>
        )}
      </div>

      <TaskList
        tasks={tasks.slice(-5).reverse()}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
        filter="all"
      />
    </div>
  );
}