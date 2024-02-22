"use client";

import {
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdatePage = ({ article }) => {
  const router = useRouter();

  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [image, setImage] = useState(article.image);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.put(`/api/articles/${article.id}`, { title, content, image });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={handleModal}
        className="p-2 bg-slate-100 rounded-sm hover:bg-orange-200 cursor-pointer"
      >
        <PencilIcon className="h-3 w-3 text-gray-500" />
      </div>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {article.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                placeholder="Product Name"
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
              <label className="label font-bold">Image</label>
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
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
