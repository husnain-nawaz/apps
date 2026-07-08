export default function Filter({
  categories,
  filterCategory,
  setFilterCategory,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="flex gap-3">
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search expense..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />
    </div>
  );
}
