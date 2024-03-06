export default function PaginationSimple({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }
  return (
    <div className="flex gap-0.5 text-sm">
      {paginationNumber.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={`${
            currentPage === data ? "bg-slate-500" : ""
          } bg-slate-200 px-2 py-1 rounded-md w-10 mx-1`}
        >
          {data}
        </button>
      ))}
    </div>
  );
}
