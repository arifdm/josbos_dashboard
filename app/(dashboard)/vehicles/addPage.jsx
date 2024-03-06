"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/solid";
// import { toast } from "react-toastify";

const createService = async (body) => {
  const { data } = await axios.post(`/fetch/service/${body?.id}`, body);
  return data.data;
};
const AddPage = () => {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [category, setCategory] = useState([]);
  const [merk, setMerk] = useState([]);
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);

  const [selectCategory, setSelectCategory] = useState(null);
  const [selectMerk, setSelectMerk] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const [selectSize, setSelectSize] = useState(null);

  const mutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      // setLoading(false);
      QueryClient.invalidateQueries({ queryKey: ["service-mitra"] });
    },
  });

  const handleSubmit = () => {
    // setLoading(true);
    mutation.mutate({
      city: selectCity,
      distance: jarak,
      service: selectServices,
      vehicleSize: ukuran,
      price: tarif,
      priceDescription: keterangan,
    });
  };

  mutation.isSuccess && console.log("IS_SUCCESS");

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    getMerk();
  }, [selectCategory]);

  useEffect(() => {
    getType();
  }, [selectMerk]);

  useEffect(() => {
    getSize();
  }, [selectCategory, selectMerk, selectType]);

  const getCategory = async () => {
    const { data } = await axios.get("/fetch/vehicle/category");
    setCategory(data.data);
  };

  const getMerk = async () => {
    const { data } = await axios.get(
      `/fetch/vehicle/merk?type=${selectCategory}`
    );
    setMerk(data.data);
  };

  const getType = async () => {
    const { data } = await axios.get(`/fetch/vehicle/type?brand=${selectMerk}`);
    setType(data.data);
  };

  const getSize = async () => {
    const { data } = await axios.get("/fetch/vehicle/size");
    setSize(data.data);
  };

  // const dataServices = categories
  //   .map((item) => item.services)
  //   .flat()
  //   .filter((item) => item.category === selectCategories);
  // // .flat()

  console.log("SIZE: ", size);

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
          <h3 className="text-lg mb-4">Tambah Kendaraan</h3>
          <form onSubmit={handleSubmit}>
            <div className="w-full grid grid-cols-2 gap-3 mt-3">
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Kendaraan
                </label>
                <select
                  onChange={(e) => setSelectCategory(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Categori
                  </option>
                  {category?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">Merk</label>
                <select
                  onChange={(e) => setSelectMerk(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Merk
                  </option>
                  {merk?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-3">
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Pilih/Masukkan Tipe
                </label>
                <select
                  onChange={(e) => setSelectType(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Tipe
                  </option>
                  {
                    type?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                    // .filter((item) => item.merk === selectMerk)
                  }
                </select>
                {/* <input
                  type="text"
                  value={tarif}
                  onChange={(e) => setTarif(e.target.value)}
                  className="input input-bordered input-sm"
                /> */}
              </div>
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Ukuran Kendaraan
                </label>
                <select
                  onChange={(e) => setSelectSize(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Ukuran
                  </option>
                  {size?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-action">
              {mutation.isPending ? (
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
