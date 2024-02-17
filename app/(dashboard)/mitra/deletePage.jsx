"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DeletePage = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (id) => {
    setIsLoading(true);
    await axios.delete(`/api/articles?id=${id}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="py-1.5 bg-gradient-to-b from-red-400 to-red-500 text-white rounded-md cursor-pointer text-center w-14 text-xs hover:from-red-300 hover:to-red-400"
        onClick={handleModal}
      >
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {article.title}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(article.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePage;
