"use client";

import Search from "@/components/UI/Search";

export default function SearchOnServer() {
  const handleSearch = (e) => {
    e.preventDefault();

    const searchTerm = e.target.value;
  };
  return (
    <div>
      <Search
        value=""
        placeholder="Cari kategori/layanan..."
        onChange={() => handleSearch(e)}
      />
    </div>
  );
}
