import { BsDatabaseSlash } from "react-icons/bs";

export default function DataNotFound() {
  return (
    <div className="flex items-center justify-center">
      <BsDatabaseSlash className="text-5xl text-gray-300 mr-4" />
      <div className="text-center text-gray-400">Tidak ada data...!</div>
    </div>
  );
}
