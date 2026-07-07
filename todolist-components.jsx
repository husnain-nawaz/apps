



// ================= Custom Hook =================
function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: text.trim(),
        completed: false,
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function editTask(id, newText) {
    if (!newText.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText.trim() }
          : task
      )
    );
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  };
}

// ================= Add Task =================
function AddTask({ addTask }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTask(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Enter Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 flex-1"
      />

      <button className="bg-blue-500 text-white px-4">
        Add
      </button>
    </form>
  );
}

// ================= Filter =================
function Filter({ filter, setFilter }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setFilter("all")}>All</button>

      <button onClick={() => setFilter("active")}>
        Active
      </button>

      <button onClick={() => setFilter("completed")}>
        Completed
      </button>
    </div>
  );
}

// ================= Task Item =================
function TaskItem({
  task,
  deleteTask,
  toggleTask,
  editTask,
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  function saveTask() {
    editTask(task.id, text);
    setEditing(false);
  }

  return (
    <div className="border p-2 flex justify-between items-center">

      <div className="flex gap-2 items-center">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        {editing ? (
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border px-1"
          />
        ) : (
          <span
            className={
              task.completed ? "line-through" : ""
            }
          >
            {task.text}
          </span>
        )}

      </div>

      <div className="flex gap-2">

        {!task.completed &&
          (editing ? (
            <button onClick={saveTask}>
              Save
            </button>
          ) : (
            <button onClick={() => setEditing(true)}>
              Edit
            </button>
          ))}

        <button
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

      </div>
    </div>
  );
}

// ================= Task List =================
function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  editTask,
  filter,
}) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  if (filteredTasks.length === 0) {
    return <p>No Tasks</p>;
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

// ================= App =================
function App() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
  } = useTasks();

  const [filter, setFilter] = useState("all");

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">

      <h1 className="text-2xl font-bold">
        Todo App
      </h1>

      <AddTask addTask={addTask} />

      <Filter
        filter={filter}
        setFilter={setFilter}
      />

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
        filter={filter}
      />

    </div>
  );
}

export default App;































