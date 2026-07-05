// import { useState } from "react";
// import Home from "./pages/Home";
// import TasksList from "./pages/TasksList";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState("home");

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <nav className="bg-white border-b border-slate-200 px-6 py-4 flex gap-4">
//         <button
//           onClick={() => setCurrentPage("home")}
//           className={`font-medium px-4 py-1.5 rounded-full text-sm transition-colors ${
//             currentPage === "home"
//               ? "bg-violet-600 text-white"
//               : "text-slate-500 hover:text-violet-600"
//           }`}
//         >
//           Home
//         </button>
//         <button
//           onClick={() => setCurrentPage("tasks")}
//           className={`font-medium px-4 py-1.5 rounded text-sm transition-colors ${
//             currentPage === "tasks"
//               ? "bg-violet-600 text-white"
//               : "text-slate-500 hover:text-violet-600"
//           }`}
//         >
//           All Tasks
//         </button>
//       </nav>

//       {currentPage === "home" ? (
//         <Home setCurrentPage={setCurrentPage} />
//       ) : (
//         <TasksList />
//       )}
//     </div>
//   );
// }















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
//         <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
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

//         {/* Add Task */}
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






// ----------------------------------------------------------










// import { useState, useEffect } from "react";

// const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// // ─── Custom Hook: useRecipes ───────────────────────────────────
// function useRecipes() {
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const searchRecipes = async (query) => {
//     if (!query.trim()) return;
//     setLoading(true);
//     setError("");
//     setRecipes([]);
//     try {
//       const res = await fetch(`${API_BASE}/search.php?s=${query}`);
//       const data = await res.json();
//       if (data.meals) {
//         setRecipes(data.meals);
//       } else {
//         setError(`No recipes found for "${query}". Try something else!`);
//       }
//     } catch {
//       setError("Something went wrong. Check your internet connection.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRandom = async () => {
//     setLoading(true);
//     setError("");
//     setRecipes([]);
//     try {
//       const res = await fetch(`${API_BASE}/random.php`);
//       const data = await res.json();
//       setRecipes(data.meals || []);
//     } catch {
//       setError("Couldn't fetch a random recipe. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { recipes, loading, error, searchRecipes, fetchRandom };
// }

// // ─── SearchBar Component ───────────────────────────────────────
// function SearchBar({ onSearch, onRandom, loading }) {
//   const [query, setQuery] = useState("");

//   const handleSubmit = () => {
//     if (query.trim()) onSearch(query);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-2">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//         placeholder="Search recipes... e.g. Chicken, Pasta, Biryani"
//         className="flex-1 border border-orange-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
//       />
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
//       >
//         {loading ? "Searching..." : "Search"}
//       </button>
//       <button
//         onClick={onRandom}
//         disabled={loading}
//         className="border border-orange-300 hover:bg-orange-50 disabled:opacity-50 text-orange-600 px-6 py-3 rounded-xl text-sm font-medium transition-colors"
//       >
//         🎲 Random
//       </button>
//     </div>
//   );
// }

// // ─── RecipeCard Component ──────────────────────────────────────
// function RecipeCard({ recipe, onClick }) {
//   return (
//     <div
//       onClick={() => onClick(recipe)}
//       className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
//     >
//       <div className="relative overflow-hidden">
//         <img
//           src={recipe.strMealThumb}
//           alt={recipe.strMeal}
//           className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
//           {recipe.strArea || "International"}
//         </span>
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2">
//           {recipe.strMeal}
//         </h3>
//         <p className="text-xs text-orange-500 mt-1 font-medium">{recipe.strCategory}</p>
//       </div>
//     </div>
//   );
// }

// // ─── IngredientList Component ──────────────────────────────────
// function IngredientList({ meal }) {
//   // MealDB stores ingredients as strIngredient1...20 and strMeasure1...20
//   const ingredients = [];
//   for (let i = 1; i <= 20; i++) {
//     const ingredient = meal[`strIngredient${i}`];
//     const measure = meal[`strMeasure${i}`];
//     if (ingredient && ingredient.trim()) {
//       ingredients.push({ ingredient, measure: measure?.trim() || "" });
//     }
//   }

//   return (
//     <div className="grid grid-cols-2 gap-2">
//       {ingredients.map(({ ingredient, measure }, i) => (
//         <div key={i} className="flex items-center gap-2 bg-orange-50 rounded-lg px-3 py-2">
//           <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
//           <span className="text-xs text-slate-700">
//             <span className="font-medium">{ingredient}</span>
//             {measure && <span className="text-slate-400"> — {measure}</span>}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── RecipeModal Component ─────────────────────────────────────
// function RecipeModal({ meal, onClose }) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "");
//   }, []);

//   // Split instructions into steps
//   const steps = meal.strInstructions
//     .split(/\r\n|\n|\r/)
//     .map((s) => s.trim())
//     .filter((s) => s.length > 10);

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Hero Image */}
//         <div className="relative">
//           <img
//             src={meal.strMealThumb}
//             alt={meal.strMeal}
//             className="w-full h-52 object-cover sm:rounded-t-2xl rounded-t-2xl"
//           />
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors"
//           >
//             ✕
//           </button>
//           <div className="absolute bottom-3 left-4">
//             <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium">
//               {meal.strCategory}
//             </span>
//             <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full ml-2">
//               {meal.strArea}
//             </span>
//           </div>
//         </div>

//         <div className="p-5">
//           {/* Title */}
//           <h2 className="text-xl font-bold text-slate-800 mb-1">{meal.strMeal}</h2>

//           {/* YouTube Link */}
//           {meal.strYoutube && (
//             <a
//               href={meal.strYoutube}
//               target="_blank"
//               rel="noreferrer"
//               className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:underline mb-4"
//             >
//               ▶ Watch on YouTube
//             </a>
//           )}

//           {/* Ingredients */}
//           <h3 className="text-sm font-semibold text-slate-700 mb-3 mt-4">🧂 Ingredients</h3>
//           <IngredientList meal={meal} />

//           {/* Instructions */}
//           <h3 className="text-sm font-semibold text-slate-700 mb-3 mt-5">📋 Instructions</h3>
//           <ol className="flex flex-col gap-3">
//             {steps.map((step, i) => (
//               <li key={i} className="flex gap-3 text-sm text-slate-600">
//                 <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
//                   {i + 1}
//                 </span>
//                 <p className="leading-relaxed">{step}</p>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Main App ──────────────────────────────────────────────────
// export default function App() {
//   const { recipes, loading, error, searchRecipes, fetchRandom } = useRecipes();
//   const [selectedMeal, setSelectedMeal] = useState(null);

//   // Load random recipe on first visit
//   useEffect(() => {
//     fetchRandom();
//   }, []);

//   return (
//     <div className="min-h-screen bg-orange-50">

//       {/* Header */}
//       <div className="bg-white border-b border-orange-100 px-4 py-6">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-bold text-slate-800 mb-1">
//             🍳 Recipe Finder
//           </h1>
//           <p className="text-slate-400 text-sm mb-5">
//             Search any dish — get ingredients & instructions instantly
//           </p>
//           <SearchBar onSearch={searchRecipes} onRandom={fetchRandom} loading={loading} />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-3xl mx-auto px-4 py-6">

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-16 text-slate-400">
//             <p className="text-4xl mb-3 animate-spin inline-block">🍳</p>
//             <p className="text-sm">Cooking up results...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && (
//           <div className="text-center py-16">
//             <p className="text-4xl mb-3">😕</p>
//             <p className="text-sm text-slate-500">{error}</p>
//           </div>
//         )}

//         {/* Results */}
//         {!loading && recipes.length > 0 && (
//           <>
//             <p className="text-xs text-slate-400 mb-4">
//               {recipes.length} recipe{recipes.length > 1 ? "s" : ""} found
//             </p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//               {recipes.map((recipe) => (
//                 <RecipeCard
//                   key={recipe.idMeal}
//                   recipe={recipe}
//                   onClick={setSelectedMeal}
//                 />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Empty state */}
//         {!loading && !error && recipes.length === 0 && (
//           <div className="text-center py-16 text-slate-400">
//             <p className="text-4xl mb-3">🔍</p>
//             <p className="text-sm">Search for a recipe above to get started</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedMeal && (
//         <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
//       )}
//     </div>
//   );
// }

















// import { useState } from "react";

// // ─── Weather Code Mapping ──────────────────────────────────────
// const WMO_CODES = {
//   0:  { label: "Clear Sky",        icon: "☀️" },
//   1:  { label: "Mainly Clear",     icon: "🌤️" },
//   2:  { label: "Partly Cloudy",    icon: "⛅" },
//   3:  { label: "Overcast",         icon: "☁️" },
//   45: { label: "Foggy",            icon: "🌫️" },
//   48: { label: "Icy Fog",          icon: "🌫️" },
//   51: { label: "Light Drizzle",    icon: "🌦️" },
//   53: { label: "Drizzle",          icon: "🌦️" },
//   55: { label: "Heavy Drizzle",    icon: "🌧️" },
//   61: { label: "Light Rain",       icon: "🌧️" },
//   63: { label: "Rain",             icon: "🌧️" },
//   65: { label: "Heavy Rain",       icon: "🌧️" },
//   71: { label: "Light Snow",       icon: "🌨️" },
//   73: { label: "Snow",             icon: "❄️" },
//   75: { label: "Heavy Snow",       icon: "❄️" },
//   80: { label: "Rain Showers",     icon: "🌦️" },
//   85: { label: "Snow Showers",     icon: "🌨️" },
//   95: { label: "Thunderstorm",     icon: "⛈️" },
//   99: { label: "Hailstorm",        icon: "⛈️" },
// };

// const getWeather = (code) =>
//   WMO_CODES[code] || { label: "Unknown", icon: "🌡️" };

// // ─── Custom Hook: useWeather ───────────────────────────────────
// function useWeather() {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchWeather = async (city) => {
//     if (!city.trim()) return;
//     setLoading(true);
//     setError("");
//     setWeather(null);

//     try {
//       // Step 1: City name → coordinates (Geocoding API)
//       const geoRes = await fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
//       );
//       const geoData = await geoRes.json();

//       if (!geoData.results || geoData.results.length === 0) {
//         setError(`City "${city}" not found. Try another name!`);
//         setLoading(false);
//         return;
//       }

//       const { latitude, longitude, name, country, timezone } = geoData.results[0];

//       // Step 2: Coordinates → Weather data
//       const weatherRes = await fetch(
//         `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
//         `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,` +
//         `wind_speed_10m,wind_direction_10m,surface_pressure,visibility` +
//         `&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum` +
//         `&timezone=${encodeURIComponent(timezone)}&forecast_days=5`
//       );
//       const weatherData = await weatherRes.json();

//       setWeather({
//         city: name,
//         country,
//         current: weatherData.current,
//         daily: weatherData.daily,
//       });
//     } catch {
//       setError("Something went wrong. Check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { weather, loading, error, fetchWeather };
// }

// // ─── SearchBar ─────────────────────────────────────────────────
// function SearchBar({ onSearch, loading }) {
//   const [city, setCity] = useState("");

//   const handleSubmit = () => {
//     if (city.trim()) onSearch(city);
//   };

//   return (
//     <div className="flex gap-2">
//       <input
//         type="text"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//         placeholder="Search city... e.g. Lahore, London, Tokyo"
//         className="flex-1 bg-white/20 backdrop-blur border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
//       />
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
//       >
//         {loading ? "..." : "Search"}
//       </button>
//     </div>
//   );
// }

// // ─── StatCard ──────────────────────────────────────────────────
// function StatCard({ icon, label, value }) {
//   return (
//     <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 flex items-center gap-3">
//       <span className="text-2xl">{icon}</span>
//       <div>
//         <p className="text-white/60 text-xs">{label}</p>
//         <p className="text-white font-semibold text-sm">{value}</p>
//       </div>
//     </div>
//   );
// }

// // ─── WindDirection ─────────────────────────────────────────────
// function windLabel(deg) {
//   const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
//   return dirs[Math.round(deg / 45) % 8];
// }

// // ─── DayForecast ───────────────────────────────────────────────
// function DayForecast({ date, code, max, min, rain }) {
//   const { icon, label } = getWeather(code);
//   const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });

//   return (
//     <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex flex-col items-center gap-1 text-white min-w-0">
//       <p className="text-xs text-white/60 font-medium">{day}</p>
//       <span className="text-2xl">{icon}</span>
//       <p className="text-xs text-white/70 text-center leading-tight">{label}</p>
//       <p className="text-sm font-bold">{Math.round(max)}°</p>
//       <p className="text-xs text-white/50">{Math.round(min)}°</p>
//       {rain > 0 && <p className="text-xs text-blue-200">💧 {rain}mm</p>}
//     </div>
//   );
// }

// // ─── Main App ──────────────────────────────────────────────────
// export default function App() {
//   const { weather, loading, error, fetchWeather } = useWeather();

//   // Dynamic gradient based on weather
//   const getBg = () => {
//     if (!weather) return "from-blue-500 to-indigo-700";
//     const code = weather.current.weather_code;
//     if (code === 0 || code === 1) return "from-amber-400 to-blue-500";
//     if (code <= 3) return "from-blue-400 to-slate-600";
//     if (code <= 55) return "from-slate-500 to-slate-700";
//     if (code <= 67) return "from-blue-600 to-slate-800";
//     if (code <= 77) return "from-slate-300 to-blue-300";
//     return "from-slate-700 to-indigo-900";
//   };

//   const current = weather?.current;
//   const { icon, label } = current ? getWeather(current.weather_code) : {};

//   return (
//     <div className={`min-h-screen bg-gradient-to-br ${getBg()} transition-all duration-700`}>
//       <div className="max-w-lg mx-auto px-4 py-8">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-white text-3xl font-bold mb-1">🌤️ Weather</h1>
//           <p className="text-white/60 text-sm">Powered by Open-Meteo · No API key needed</p>
//         </div>

//         {/* Search */}
//         <div className="mb-6">
//           <SearchBar onSearch={fetchWeather} loading={loading} />
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-16 text-white">
//             <p className="text-5xl mb-3 animate-pulse">🌍</p>
//             <p className="text-sm text-white/70">Fetching weather data...</p>
//           </div>
//         )}

//         {/* Error */}
//         {error && !loading && (
//           <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 text-white text-sm text-center">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Weather Display */}
//         {weather && !loading && (
//           <>
//             {/* Main Card */}
//             <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 mb-4 text-white">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold">{weather.city}</h2>
//                   <p className="text-white/60 text-sm">{weather.country}</p>
//                   <p className="text-6xl font-thin mt-3">
//                     {Math.round(current.temperature_2m)}°C
//                   </p>
//                   <p className="text-white/70 text-sm mt-1">
//                     Feels like {Math.round(current.apparent_temperature)}°C
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className="text-6xl">{icon}</span>
//                   <p className="text-white/70 text-sm mt-2">{label}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <StatCard icon="💧" label="Humidity" value={`${current.relative_humidity_2m}%`} />
//               <StatCard icon="💨" label="Wind Speed" value={`${current.wind_speed_10m} km/h`} />
//               <StatCard icon="🧭" label="Wind Direction" value={windLabel(current.wind_direction_10m)} />
//               <StatCard icon="🔵" label="Pressure" value={`${Math.round(current.surface_pressure)} hPa`} />
//               {current.visibility && (
//                 <StatCard icon="👁️" label="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
//               )}
//             </div>

//             {/* 5-Day Forecast */}
//             <div>
//               <p className="text-white/60 text-xs font-medium mb-3 uppercase tracking-wide">5-Day Forecast</p>
//               <div className="grid grid-cols-5 gap-2">
//                 {weather.daily.time.map((date, i) => (
//                   <DayForecast
//                     key={date}
//                     date={date}
//                     code={weather.daily.weather_code[i]}
//                     max={weather.daily.temperature_2m_max[i]}
//                     min={weather.daily.temperature_2m_min[i]}
//                     rain={weather.daily.precipitation_sum[i]}
//                   />
//                 ))}
//               </div>
//             </div>
//           </>
//         )}

//         {/* Empty State */}
//         {!weather && !loading && !error && (
//           <div className="text-center py-16 text-white">
//             <p className="text-6xl mb-4">🌍</p>
//             <p className="text-lg font-medium mb-1">Search any city</p>
//             <p className="text-white/50 text-sm">e.g. Lahore, London, New York, Dubai</p>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }








// -------------------------------------------------










// import React, { useState, useMemo } from "react";
// import { Search, MapPin, Calendar, Users, X, Check, Plane, Star, ArrowLeft } from "lucide-react";

// const DESTINATIONS = [
//   {
//     id: "d1",
//     name: "Santorini",
//     country: "Greece",
//     tagline: "Whitewashed cliffs, endless blue",
//     price: 780,
//     days: 5,
//     rating: 4.9,
//     tag: "Island",
//     palette: "from-sky-500 to-blue-700",
//   },
//   {
//     id: "d2",
//     name: "Kyoto",
//     country: "Japan",
//     tagline: "Temples, gardens, and quiet streets",
//     price: 1120,
//     days: 7,
//     rating: 4.8,
//     tag: "Culture",
//     palette: "from-rose-500 to-orange-600",
//   },
//   {
//     id: "d3",
//     name: "Marrakech",
//     country: "Morocco",
//     tagline: "Souks, spice, and desert light",
//     price: 640,
//     days: 4,
//     rating: 4.6,
//     tag: "Desert",
//     palette: "from-amber-500 to-red-700",
//   },
//   {
//     id: "d4",
//     name: "Reykjavik",
//     country: "Iceland",
//     tagline: "Glaciers, geysers, northern lights",
//     price: 990,
//     days: 6,
//     rating: 4.9,
//     tag: "Nature",
//     palette: "from-teal-500 to-indigo-800",
//   },
//   {
//     id: "d5",
//     name: "Cusco",
//     country: "Peru",
//     tagline: "Gateway to the Andes and Machu Picchu",
//     price: 860,
//     days: 8,
//     rating: 4.7,
//     tag: "Mountain",
//     palette: "from-emerald-500 to-green-800",
//   },
//   {
//     id: "d6",
//     name: "Lisbon",
//     country: "Portugal",
//     tagline: "Hills, trams, and river light",
//     price: 560,
//     days: 5,
//     rating: 4.7,
//     tag: "City",
//     palette: "from-yellow-500 to-amber-700",
//   },
// ];

// const TAGS = ["All", "Island", "Culture", "Desert", "Nature", "Mountain", "City"];

// function genBookingCode() {
//   const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
//   let code = "";
//   for (let i = 0; i < 2; i++) code += letters[Math.floor(Math.random() * letters.length)];
//   code += Math.floor(1000 + Math.random() * 9000);
//   return code;
// }

// export default function TravelBookingApp() {
//   const [query, setQuery] = useState("");
//   const [activeTag, setActiveTag] = useState("All");
//   const [selected, setSelected] = useState(null); // destination being booked
//   const [confirmation, setConfirmation] = useState(null); // finished booking
//   const [form, setForm] = useState({ date: "", travelers: 1, name: "", email: "" });
//   const [step, setStep] = useState("browse"); // browse | book | confirmed

//   const filtered = useMemo(() => {
//     return DESTINATIONS.filter((d) => {
//       const matchesTag = activeTag === "All" || d.tag === activeTag;
//       const matchesQuery =
//         query.trim() === "" ||
//         d.name.toLowerCase().includes(query.toLowerCase()) ||
//         d.country.toLowerCase().includes(query.toLowerCase());
//       return matchesTag && matchesQuery;
//     });
//   }, [query, activeTag]);

//   function openBooking(dest) {
//     setSelected(dest);
//     setForm({ date: "", travelers: 1, name: "", email: "" });
//     setStep("book");
//   }

//   function closeAll() {
//     setSelected(null);
//     setConfirmation(null);
//     setStep("browse");
//   }

//   function submitBooking(e) {
//     e.preventDefault();
//     if (!form.date || !form.name || !form.email) return;
//     const total = selected.price * Number(form.travelers);
//     setConfirmation({
//       ...selected,
//       ...form,
//       total,
//       code: genBookingCode(),
//     });
//     setStep("confirmed");
//   }

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
//       {/* Header */}
//       <header className="border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur z-10">
//         <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center rotate-45">
//               <Plane className="w-4 h-4 text-slate-900 -rotate-45" strokeWidth={2.5} />
//             </div>
//             <span className="text-lg tracking-tight font-serif italic">Voyagely</span>
//           </div>
//           <span className="text-xs text-slate-500 hidden sm:block">Small trips, well planned</span>
//         </div>
//       </header>

//       <main className="max-w-6xl mx-auto px-5 py-10">
//         {step === "browse" && (
//           <>
//             {/* Hero */}
//             <section className="mb-10">
//               <h1 className="text-3xl sm:text-4xl font-serif italic mb-2 text-slate-50">
//                 Where to, next?
//               </h1>
//               <p className="text-slate-400 mb-6 text-sm">
//                 Hand-picked trips, booked in under a minute.
//               </p>

//               <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 max-w-lg">
//                 <Search className="w-4 h-4 text-slate-500 shrink-0" />
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search destination or country"
//                   className="bg-transparent outline-none w-full text-sm placeholder:text-slate-600"
//                 />
//               </div>

//               <div className="flex flex-wrap gap-2 mt-4">
//                 {TAGS.map((tag) => (
//                   <button
//                     key={tag}
//                     onClick={() => setActiveTag(tag)}
//                     className={`px-3 py-1.5 rounded-full text-xs border transition ${
//                       activeTag === tag
//                         ? "bg-amber-400 text-slate-900 border-amber-400 font-medium"
//                         : "border-slate-800 text-slate-400 hover:border-slate-600"
//                     }`}
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>
//             </section>

//             {/* Grid */}
//             <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//               {filtered.map((d) => (
//                 <button
//                   key={d.id}
//                   onClick={() => openBooking(d)}
//                   className="text-left group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-slate-600 transition"
//                 >
//                   <div className={`h-32 bg-gradient-to-br ${d.palette} relative`}>
//                     <span className="absolute top-3 left-3 text-[11px] bg-slate-950/60 text-slate-100 px-2 py-1 rounded-full">
//                       {d.tag}
//                     </span>
//                     <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] bg-slate-950/60 text-slate-100 px-2 py-1 rounded-full">
//                       <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//                       {d.rating}
//                     </span>
//                   </div>
//                   <div className="p-4">
//                     <div className="flex items-baseline justify-between mb-1">
//                       <h3 className="font-serif italic text-lg">{d.name}</h3>
//                       <span className="text-sm text-amber-400 font-medium">${d.price}</span>
//                     </div>
//                     <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
//                       <MapPin className="w-3 h-3" /> {d.country} · {d.days} days
//                     </p>
//                     <p className="text-sm text-slate-400">{d.tagline}</p>
//                   </div>
//                 </button>
//               ))}

//               {filtered.length === 0 && (
//                 <p className="text-slate-500 text-sm col-span-full text-center py-10">
//                   No trips match that search. Try a different destination.
//                 </p>
//               )}
//             </section>
//           </>
//         )}

//         {step === "book" && selected && (
//           <BookingForm
//             destination={selected}
//             form={form}
//             setForm={setForm}
//             onSubmit={submitBooking}
//             onBack={() => setStep("browse")}
//           />
//         )}

//         {step === "confirmed" && confirmation && (
//           <BoardingPass booking={confirmation} onDone={closeAll} />
//         )}
//       </main>
//     </div>
//   );
// }

// function BookingForm({ destination, form, setForm, onSubmit, onBack }) {
//   const total = destination.price * Number(form.travelers || 1);
//   return (
//     <div className="max-w-lg mx-auto">
//       <button
//         onClick={onBack}
//         className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mb-6"
//       >
//         <ArrowLeft className="w-3 h-3" /> Back to destinations
//       </button>

//       <div className={`rounded-2xl h-28 bg-gradient-to-br ${destination.palette} mb-6 flex items-end p-4`}>
//         <div>
//           <h2 className="text-xl font-serif italic text-white">{destination.name}</h2>
//           <p className="text-xs text-white/80">{destination.country} · {destination.days} days</p>
//         </div>
//       </div>

//       <form onSubmit={onSubmit} className="space-y-4">
//         <div>
//           <label className="text-xs text-slate-400 mb-1 flex items-center gap-1">
//             <Calendar className="w-3 h-3" /> Departure date
//           </label>
//           <input
//             type="date"
//             required
//             value={form.date}
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//             className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
//           />
//         </div>

//         <div>
//           <label className="text-xs text-slate-400 mb-1 flex items-center gap-1">
//             <Users className="w-3 h-3" /> Travelers
//           </label>
//           <input
//             type="number"
//             min="1"
//             max="8"
//             required
//             value={form.travelers}
//             onChange={(e) => setForm({ ...form, travelers: e.target.value })}
//             className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400"
//           />
//         </div>

//         <div>
//           <label className="text-xs text-slate-400 mb-1 block">Full name</label>
//           <input
//             type="text"
//             required
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             placeholder="Jane Doe"
//             className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400 placeholder:text-slate-600"
//           />
//         </div>

//         <div>
//           <label className="text-xs text-slate-400 mb-1 block">Email</label>
//           <input
//             type="email"
//             required
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             placeholder="jane@example.com"
//             className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400 placeholder:text-slate-600"
//           />
//         </div>

//         <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
//           <span className="text-slate-400">Total</span>
//           <span className="text-lg font-medium text-amber-400">${total}</span>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-amber-400 text-slate-900 font-medium rounded-lg py-2.5 text-sm hover:bg-amber-300 transition"
//         >
//           Confirm booking
//         </button>
//       </form>
//     </div>
//   );
// }

// function BoardingPass({ booking, onDone }) {
//   return (
//     <div className="max-w-lg mx-auto text-center">
//       <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
//         <Check className="w-6 h-6 text-emerald-400" />
//       </div>
//       <h2 className="text-2xl font-serif italic mb-1">Booking confirmed</h2>
//       <p className="text-slate-500 text-sm mb-8">A copy has been sent to {booking.email}</p>

//       {/* Ticket */}
//       <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-left">
//         <div className={`bg-gradient-to-br ${booking.palette} p-5`}>
//           <div className="flex justify-between items-start text-white">
//             <div>
//               <p className="text-[10px] uppercase tracking-widest text-white/70">Destination</p>
//               <p className="text-xl font-serif italic">{booking.name}</p>
//               <p className="text-xs text-white/70">{booking.country}</p>
//             </div>
//             <Plane className="w-6 h-6" />
//           </div>
//         </div>

//         <div className="relative px-5 py-4">
//           <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-slate-950 border border-slate-800" />
//           <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-slate-950 border border-slate-800" />
//           <div className="border-t border-dashed border-slate-700 -mx-5 mb-4" />

//           <div className="grid grid-cols-2 gap-4 text-sm font-mono">
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Passenger</p>
//               <p>{booking.name}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Booking code</p>
//               <p className="text-amber-400">{booking.code}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Departure</p>
//               <p>{booking.date}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Travelers</p>
//               <p>{booking.travelers}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Duration</p>
//               <p>{booking.days} days</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-slate-500 uppercase tracking-widest">Total paid</p>
//               <p className="text-amber-400">${booking.total}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={onDone}
//         className="mt-8 text-sm text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg px-4 py-2"
//       >
//         Book another trip
//       </button>
//     </div>
//   );
// }








// --------------------------------------







































