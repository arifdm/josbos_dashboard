"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ButtonUserStatus } from "@/components/UI/TableAction";

const DeletePage = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (id) => {
    setIsLoading(true);
    await axios.delete(`/api/user?id=${id}`);
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ButtonUserStatus onClick={handleModal} />
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <p className="text-lg">Yakin akan menghapus data ini...?</p>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(data.id)}
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
