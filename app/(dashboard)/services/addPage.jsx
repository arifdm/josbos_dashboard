"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const getCategory = async () => {
  const { data } = await axios.get(`/fetch/category`);
  return data.data;
};

const createService = async (body) => {
  const { data } = await axios.post(`/fetch/category`, body);
  return data.data;
};

const AddPage = ({ id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState([]);
  const [layanan, setLayanan] = useState("");

  const { data: dataCategory, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const mutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-mitra", id] });
      toast.success("Layanan telah berhasil ditambahkan");
      // router.refresh();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleModal();
    const formData = {
      category: selectCategory,
      newService: layanan,
    };
    // console.log("FORM_DATA: ", formData);
    mutation.mutate(formData);
  };

  // isSuccess && toast.success("Data service berhasil ditambahkan");

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
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleModal}
          >
            ✕
          </button>
          <h3 className="text-lg mb-4">Tambah Layanan</h3>
          <form onSubmit={handleSubmit}>
            <div className="w-full grid grid-cols-2 gap-3 mt-3">
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Kategori
                </label>
                <select
                  onChange={(e) => setSelectCategory(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih
                  </option>
                  {dataCategory?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Layanan
                </label>
                <input
                  type="text"
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                  className="input input-bordered input-sm"
                />
              </div>
            </div>
            <div className="modal-action">
              {mutation.isLoading ? (
                <button type="button" className="btn btn-sm loading">
                  Loading...
                </button>
              ) : (
                <button type="submit" className="btn btn-sm btn-primary">
                  Simpan
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
