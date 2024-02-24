"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
// import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const createService = async (body) => {
  const { data } = await axios.post(`/fetch/service/${body?.id}`, body);
  return data.data;
};
const AddPage = ({ id }) => {
  // const router = useRouter();

  const [jarak, setJarak] = useState("");
  const [tarif, setTarif] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [city, setCity] = useState([]);
  const [vehicleSize, setVehicleSize] = useState([]);

  const [selectCity, setSelectCity] = useState(null);
  const [selectCategories, setSelectCategories] = useState(null);
  const [selectServices, setSelectServices] = useState(null);
  const [ukuran, setUkuran] = useState(null);
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(`/fetch/service/${id}`, {
  //       city: selectCity,
  //       distance: jarak,
  //       service: selectServices,
  //       vehicleSize: ukuran,
  //       price: tarif,
  //       priceDescription: keterangan,
  //     });
  //     setIsLoading(false);
  //     router.refresh();

  //     setIsOpen(false);
  //     console.log("RES: ", res);
  //   } catch (error) {
  //     console.log("ERROR: ", error);
  //   }
  // };

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
      id: id,
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
    getKategoriLayanan();
    getCity();
    getVehicleSize();
  }, [id]);

  const getKategoriLayanan = async () => {
    const { data } = await axios.get("/api/category");
    setCategories(data.data);
  };

  const getCity = async () => {
    const { data } = await axios.get("/fetch/city");
    setCity(data.data);
  };

  const getVehicleSize = async () => {
    const { data } = await axios.get("/fetch/vehicle/size");
    setVehicleSize(data.data);
  };

  const dataServices = categories
    .map((item) => item.services)
    .flat()
    .filter((item) => item.category === selectCategories);
  // .flat()
  // console.log("CITY: ", city);

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
                <label className="label font-small text-gray-500">Kota</label>
                <select
                  onChange={(e) => setSelectCity(e.target.value)}
                  className="select select-bordered select-sm w-full"
                >
                  <option disabled selected>
                    Pilih Kota
                  </option>
                  {city?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Jarak Layanan (Km)
                </label>
                <input
                  type="text"
                  value={jarak}
                  onChange={(e) => setJarak(e.target.value)}
                  className="input input-bordered input-sm"
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-3">
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">
                  Kategori
                </label>
                <select
                  onChange={(e) => setSelectCategories(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Kategori
                  </option>
                  {categories?.map((item) => (
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
                <select
                  onChange={(e) => setSelectServices(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Layanan
                  </option>
                  {dataServices?.map((item) => (
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
                  Ukuran Kendaraan
                </label>
                <select
                  onChange={(e) => setUkuran(e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option disabled selected>
                    Pilih Kategori
                  </option>
                  {vehicleSize?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label font-small text-gray-500">Tarif</label>
                <input
                  type="text"
                  value={tarif}
                  onChange={(e) => setTarif(e.target.value)}
                  className="input input-bordered input-sm"
                />
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label font-small text-gray-500">
                Keterangaan
              </label>
              <input
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="input input-bordered input-sm"
              />
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
