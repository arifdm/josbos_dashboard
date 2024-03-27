"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const updateSaldo = async (body) => {
  const data = await axios.put(`/fetch/saldo/approve/${body?.id}`, body);
  return data?.data;
};

const ApprovePage = ({ data }) => {
  const router = useRouter();
  // const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // console.log("DATA: ", data);

  const mutation = useMutation({
    mutationFn: updateSaldo,
    onSuccess: (res) => {
      console.log("RES_item: ", res);
      // queryClient.invalidateQueries({ queryKey: ["service-mitra", id] });
      // toast.success("Layanan telah berhasil ditambahkan");
      // router.push("mitra/saldo-mitra");
      router.refresh();
    },
    onError: (error) => console.log(error),
  });

  const disetujui = () => {
    mutation.mutate({ id: data.id, status: true });
    setIsOpen(false);
  };

  const dibatalkan = () => {
    console.log("proses");
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="flex justify-center cursor-pointer bg-red-200 text-red-500 py-1 px-2 rounded font-medium text-sm"
      >
        Approve
      </div>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Persetujuan</h3>
          {error && (
            <div className="alert alert-error shadow-lg mb-2">{error}</div>
          )}
          Setelah melakukan validasi dan menyetujui data ini, silakan pilih
          tombol SETUJU jika tidak pilih tombol BATALKAN.
          <div className="modal-action flex flex-row justify-between">
            <button
              type="button"
              className="btn"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-error"
                onClick={dibatalkan}
              >
                Batalkan
              </button>
              {isLoading ? (
                <button type="button" className="btn btn-success" disabled>
                  proses...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={disetujui}
                >
                  Setuju
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovePage;
