import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit, filter }) {
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-sm">
          {filter === "completed"
            ? "No completed tasks yet"
            : filter === "active"
            ? "No pending tasks — you're all caught up!"
            : "No tasks yet. Add one above!"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {filtered.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}