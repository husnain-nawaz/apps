// import { useState, useEffect } from 'react'
// import './App.css'

// const diseases = [
//   "Flu", "Diabetes", "HyperTensions", "Asthama", "Malaria",
//   "Typhoid", "Migraine", "Athritis", "Covid-19", "Allergy"
// ];

// function App(){
//   const [form, setform] = useState({
//     firstname: "",
//     lastname: "",
//     phone: "",
//     diseases: diseases[0],
//   });
//   const [editingIndex, setEditingIndex] = useState(null);


//   // dispaly krna jo b values ham ko patient ki milain ge or jo b value tring ki surat ma milain un ko convert krna phir object ma or tables ma shift krna or table ma agr ko value already ho wo b display krna - or initial value satte krna patients ki usestate na  
//   const [patients, setpatients] = useState(()=>{
//     const savedpatients = localStorage.getItem("patients");
//     return savedpatients ? JSON.parse(savedpatients) : [];
//   })

//     // yahan save kro patients sting ma convert kr ky data jo b mily patients state sy - jab b patients satte ka variable change ho
//     useEffect(()=>{
//       localStorage.setItem("patients", JSON.stringify(patients))
//     },[patients])

//   const handlechange = (e)=>{
//     setform({...form, [e.target.name]: e.target.value});
//   }
//   const handlesubmit = (e)=>{
//     e.preventDefault();

//     if(!form.firstname || !form.lastname || !form.phone) return;

//     if(editingIndex === null){
//       setpatients([...patients, form]);
//     }else{
//       const updatedPatients = [...patients];
//       updatedPatients.splice(editingIndex,1,form);
//       setpatients(updatedPatients);
//       setEditingIndex(null);
//     }

//     setform({
//       firstname: "",
//       lastname: "",
//       phone: "",
//       diseases: diseases[0],
//     })
//   }

//   const handleDelete = (indexvalue)=>{
//     setpatients(
//       patients.filter(
//         (patientvalues, patientsindex)=> patientsindex !== indexvalue
//       )
//     );
//   }

//   const handleEdit = (indexvalue)=>{
//     setform(patients[indexvalue]);
//     setEditingIndex(indexvalue);
//   }

//   return(
// <>
// <div className='max-w-xl mx-auto bg-green-500 rounded mt-3 overflow-hidden'>
//   <p className='text-center font-bold mt-3 underline'>PATIENT DATA</p>

//   <form onSubmit={handlesubmit} className='flex flex-wrap gap-2 mt-10 justify-center p-3 rounded'>
//     <input
//       onChange={handlechange}
//       value={form.firstname}
//       name='firstname'
//       type="text"
//       className='border rounded px-2 py-2'
//       placeholder='First Name'
//     />

//     <input
//       onChange={handlechange}
//       value={form.lastname}
//       name='lastname'
//       type="text"
//       className='border rounded px-2 py-2'
//       placeholder='Last Name'
//     />

//     <input
//       onChange={handlechange}
//       value={form.phone}
//       name='phone'
//       type="number"
//       className='border rounded px-2 py-2'
//       placeholder='phone No'
//     />

//     <select
//       onChange={handlechange}
//       value={form.diseases}
//       name="diseases"
//       className='border rounded w-auto py-2'
//     >
//       {diseases.map((diseasevalue)=>(
//         <option key={diseasevalue} value={diseasevalue}>
//           {diseasevalue}
//         </option>
//       ))}
//     </select>

//     <button type='submit' className='bg-amber-400 px-2 py-2 rounded'>
//       Submit
//     </button>
//   </form>

//   <table className='w-full table-fixed border border-collapse'>
//     <thead>
//       <tr className='bg-amber-50'>
//         <th className='border px-2 py-2'>First Name</th>
//         <th className='border px-2 py-2'>Last Name</th>
//         <th className='border px-2 py-2'>Phone No</th>
//         <th className='border px-2 py-2'>Disease</th>
//         <th className='border px-2 pt-2'>Deletion</th>
//         <th className='border px-2 pt-2'>EDIT</th>
//       </tr>
//     </thead>

//     <tbody>
//       {patients.map((patient,indexvalue)=>(
//         <tr key={indexvalue}>
//           <td className='border px-2 py-2'>{patient.firstname}</td>
//           <td className='border px-2'>{patient.lastname}</td>
//           <td className='border px-2'>{patient.phone}</td>
//           <td className='border px-2 overflow-hidden'>{patient.diseases}</td>

//           <td className='border px-2 overflow-hidden'>
//             <button
//               onClick={()=> handleDelete(indexvalue)}
//               className='bg-red-400 px-2 mx-2 rounded shadow-2xl hover:bg-amber-300'
//             >
//               Delete
//             </button>
//           </td>

//           <td className='border px-2 overflow-hidden'>
//             <button
//               onClick={()=>handleEdit(indexvalue)}
//               className='bg-blue-400 px-2 mx-2 rounded shadow-2xl hover:bg-amber-300'
//             >
//               EDIT
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
// </>
//   )
// }

// export default App;




// -------------------------------------------------------------------








// import Button from "./Button.jsx"

// function App(){
//   return (
//     <>
//       <Button text="Save" />
//       <Button text="Delete" />
//       <Button text="Edit" />
//     </>
//   )
// }
// export default App;




// -------------------------------------------------------------------




// import PatientTable from './patienttable.jsx'

// function App(){
//     const Patientsarr = [
//       {id: 1, name: "Ali", phone: "12345"},
//       {id: 2, name: "Ahmed", phone: "45678"},
//     ];
//     return(
//       <>
//         <PatientTable patients={Patientsarr} />
//       </>
//     )

// }
// export default App;




// ------------------------------------------------------------




// import { Routes, Route } from "react-router-dom";
// import Table from "./pages/table";
// import { useState, useEffect } from "react";
// import "./app.css";

// import PatientForm from "./components/patientform";
// import PatientTable from "./components/patienttable";

// const diseases = [
//   "Flu",
//   "Diabetes",
//   "HyperTensions",
//   "Asthama",
//   "Malaria",
//   "Typhoid",
//   "Migraine",
//   "Athritis",
//   "Covid-19",
//   "Allergy",
// ];

// function App() {
//   const [form, setform] = useState({
//     firstname: "",
//     lastname: "",
//     phone: "",
//     diseases: diseases[0],
//   });

//   const [editingIndex, setEditingIndex] = useState(null);

//   const [patients, setpatients] = useState(() => {
//     const savedpatients = localStorage.getItem("patients");
//     return savedpatients ? JSON.parse(savedpatients) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("patients", JSON.stringify(patients));
//   }, [patients]);

//   const handlechange = (e) => {
//     setform({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handlesubmit = (e) => {
//     e.preventDefault();

//     if (!form.firstname || !form.lastname || !form.phone)
//       return;

//     if (editingIndex === null) {
//       setpatients([...patients, form]);
//     } else {
//       const updatedPatients = [...patients];
//       updatedPatients.splice(editingIndex, 1, form);
//       setpatients(updatedPatients);
//       setEditingIndex(null);
//     }

//     setform({
//       firstname: "",
//       lastname: "",
//       phone: "",
//       diseases: diseases[0],
//     });
//   };

//   const handleDelete = (index) => {
//     setpatients(
//       patients.filter((values, i) => i !== index)
//     );
//   };

//   const handleEdit = (index) => {
//     setform(patients[index]);
//     setEditingIndex(index);
//   };

//   return (
//     <>
//   <Routes>

//     <Route
//       path="/"
//       element={
//         <div className="max-w-xl mx-auto bg-green-500 rounded mt-3 overflow-hidden">

//           <p className="text-center font-bold mt-3 underline">
//             PATIENT DATA
//           </p>

//           <PatientForm
//             form={form}
//             handlechange={handlechange}
//             handlesubmit={handlesubmit}
//             diseases={diseases}
//             editingIndex={editingIndex}
//           />

//           <PatientTable
//            Colorchange='w-full table-fixed border border-collapse bg-pink-400'
//             patients={patients}
//             handleDelete={handleDelete}
//             handleEdit={handleEdit}
//           />

//         </div>
//       }
//     />

//     <Route
//       path="/table"
//       element={
//         <>

//         <Table
//           patients={patients}
//           handleDelete={handleDelete}
//           handleEdit={handleEdit}
//         />
//         </>
//       }
//     />

//   </Routes>

//   <button onClick={()=>{
//     localStorage.clear()
//   }} className="bg-orange-600 p-2 rounded m-2">CLear</button>
//   </>
// );
// }

// export default App;












// -----------------------------------------------------------------------------












// import { useState, useEffect } from "react";

// // ─── Custom Hook ───────────────────────────────────────────────
// function useTasks() {
//   const [tasks, setTasks] = useState(() => {
//     try {
//       const saved = localStorage.getItem("tasks");
//       return saved ? JSON.parse(saved) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = (text) => {
//     if (!text.trim()) return;
//     setTasks((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         text: text.trim(),
//         completed: false,
//         createdAt: new Date().toLocaleDateString("en-PK", {
//           day: "numeric", month: "short", year: "numeric",
//         }),
//       },
//     ]);
//   };

//   const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));
//   const toggleTask = (id) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
//   const editTask = (id, newText) => {
//     if (!newText.trim()) return;
//     setTasks((prev) => prev.map((t) => t.id === id ? { ...t, text: newText.trim() } : t));
//   };

//   return { tasks, addTask, deleteTask, toggleTask, editTask };
// }

// // ─── AddTask Component ─────────────────────────────────────────
// function AddTask({ onAdd }) {
//   const [text, setText] = useState("");

//   const handleSubmit = () => {
//     if (!text.trim()) return;
//     onAdd(text);
//     setText("");
//   };

//   return (
//     <div className="flex gap-2">
//       <input
//         type="text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//         placeholder="Add a new task..."
//         className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
//       >
//         Add
//       </button>
//     </div>
//   );
// }

// // ─── TaskItem Component ────────────────────────────────────────
// function TaskItem({ task, onDelete, onToggle, onEdit }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(task.text);

//   const handleSave = () => {
//     onEdit(task.id, editText);
//     setIsEditing(false);
//   };

//   return (
//     <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
//       task.completed ? "bg-slate-50 border-slate-100 opacity-60" : "bg-white border-slate-200"
//     }`}>

//       {/* Checkbox */}
//       <button
//         onClick={() => onToggle(task.id)}
//         className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
//           task.completed ? "bg-violet-600 border-violet-600" : "border-slate-300 hover:border-violet-400"
//         }`}
//       >
//         {task.completed && (
//           <svg className="w-full h-full p-0.5 text-white" viewBox="0 0 12 12" fill="none">
//             <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         )}
//       </button>

//       {/* Text / Edit */}
//       <div className="flex-1 min-w-0">
//         {isEditing ? (
//           <input
//             autoFocus
//             value={editText}
//             onChange={(e) => setEditText(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleSave();
//               if (e.key === "Escape") setIsEditing(false);
//             }}
//             onBlur={handleSave}
//             className="w-full text-sm border-b border-violet-400 focus:outline-none bg-transparent py-0.5"
//           />
//         ) : (
//           <>
//             <p className={`text-sm truncate ${task.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
//               {task.text}
//             </p>
//             <p className="text-xs text-slate-400 mt-0.5">{task.createdAt}</p>
//           </>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="flex gap-1 flex-shrink-0">
//         {!task.completed && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
//           >
//             ✏️
//           </button>
//         )}
//         <button
//           onClick={() => onDelete(task.id)}
//           className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//         >
//           🗑️
//         </button>
//       </div>
//     </div>
//   );
// }

// // ─── TaskList Component ────────────────────────────────────────
// function TaskList({ tasks, onDelete, onToggle, onEdit, filter }) {
//   const filtered = tasks.filter((t) => {
//     if (filter === "active") return !t.completed;
//     if (filter === "completed") return t.completed;
//     return true;
//   });

//   if (filtered.length === 0) {
//     return (
//       <div className="text-center py-12 text-slate-400">
//         <p className="text-4xl mb-3">📭</p>
//         <p className="text-sm">
//           {filter === "completed" ? "No completed tasks yet"
//             : filter === "active" ? "You're all caught up!"
//             : "No tasks yet. Add one above!"}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {filtered.map((task) => (
//         <TaskItem key={task.id} 
//         task={task} 
//         onDelete={onDelete} 
//         onToggle={onToggle} onEdit={onEdit} />
//       ))}
//     </div>
//   );
// }

// // ─── Main App ──────────────────────────────────────────────────
// const FILTERS = ["all", "active", "completed"];

// function App() {
//   const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks();
//   const [filter, setFilter] = useState("all");

//   const counts = {
//     all: tasks.length,
//     active: tasks.filter((t) => !t.completed).length,
//     completed: tasks.filter((t) => t.completed).length,
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-xl mx-auto px-4 py-8">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800">My Tasks</h1>
//           <p className="text-slate-400 text-sm mt-1">
//             {counts.active} pending · {counts.completed} done
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 gap-3 mb-6">
//           <div className="bg-violet-50 rounded-xl p-4">
//             <p className="text-2xl font-bold text-violet-600">{counts.active}</p>
//             <p className="text-xs text-violet-400 mt-0.5">Pending</p>
//           </div>
//           <div className="bg-emerald-50 rounded-xl p-4">
//             <p className="text-2xl font-bold text-emerald-600">{counts.completed}</p>
//             <p className="text-xs text-emerald-400 mt-0.5">Completed</p>
//           </div>
//         </div>

//         {/* Add Task ya ha input field jis ma likhty han  */}
//         <div className="mb-6">
//           <AddTask onAdd={addTask} />
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex gap-2 mb-5 bg-slate-100 p-1 rounded-xl">
//           {FILTERS.map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`flex-1 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
//                 filter === f ? "bg-white text-violet-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
//               }`}
//             >
//               {f} ({counts[f]})
//             </button>
//           ))}
//         </div>

//         {/* Task List */}
//         <TaskList
//           tasks={tasks}
//           onDelete={deleteTask}
//           onToggle={toggleTask}
//           onEdit={editTask}
//           filter={filter}
//         />

//       </div>
//     </div>
//   );
// }

// export default App;













import { useState, useEffect } from "react";

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



















