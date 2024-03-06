import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { TbPencil, TbUserX } from "react-icons/tb";

export function ButtonUpdate({ handleModal }) {
  return (
    <div>
      <div
        onClick={handleModal}
        className="p-2 bg-slate-100 rounded-md hover:bg-orange-200 cursor-pointer"
      >
        <TbPencil className="h-3 w-3 text-gray-500" />
      </div>
    </div>
  );
}

export function ButtonUserStatus({ handleModal }) {
  return (
    <div>
      <div
        onClick={handleModal}
        className="p-2 bg-slate-100 rounded-md hover:bg-indigo-200 cursor-pointer"
      >
        <TbUserX className="h-3 w-3 text-gray-500" />
      </div>
    </div>
  );
}

export function ButtonDelete({ handleModal }) {
  return (
    <div>
      <div
        onClick={handleModal}
        className="p-2 bg-slate-100 rounded-md hover:bg-red-200 cursor-pointer"
      >
        <ArchiveBoxIcon className="h-3 w-3 text-gray-500" />
      </div>
    </div>
  );
}
