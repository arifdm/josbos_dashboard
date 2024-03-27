export default function Search({ value, placeholder, onChange }) {
  return (
    <div>
      <form className="max-w-sm">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={value}
            className="block w-full px-3 py-1.5 ps-10 bg-white border shadow-sm border-slate-300 placeholder-slate-300 focus:outline-none focus:border-slate-300 focus:ring-slate-300 rounded-md focus:ring-1"
            placeholder={placeholder}
            onChange={onChange}
            required
          />
        </div>
      </form>
    </div>
  );
}
