"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      setError("Silakan masukkan data");
      return;
    } else {
      setError("");
      setIsLoading(true);
      await axios.post("/api/promo", { title, content, image });
      setIsLoading(false);

      setTitle("");
      setContent("");
      setImage("");

      router.refresh();
      setIsOpen(false);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleModal}
        className="px-4 py-1.5 bg-gradient-to-b from-emerald-400 to-emerald-500 text-white rounded-md cursor-pointer text-center w-28 text-sm hover:from-emerald-300 hover:to-emerald-400"
      >
        <PlusIcon className="w-4 h-4 inline-block" /> Tambah
      </div>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Promo</h3>
          <form onSubmit={handleSubmit} className="mt-5">
            {error && (
              <div className="alert alert-error shadow-lg mb-2">{error}</div>
            )}
            <div className="form-control w-full">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Content</label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input input-bordered"
                placeholder="Content"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Images</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input input-bordered"
                placeholder="Url"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              {!isLoading ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
