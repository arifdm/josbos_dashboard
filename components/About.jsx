import {
  DevicePhoneMobileIcon,
  MapPinIcon,
  UserIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Kemudahan Pesan",
    description:
      "Download, daftar, dan langsung pesan dengan cara yang sangat mudah. Pilih salah satu cara dari 4 metode yang disediakan.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Datang ke Lokasi",
    description:
      "Kamu dapat pesan sesuai layanan yang tersedia lalu sesuaikan dengan lokasi yang diinginkan dengan tepat dan akurat.",
    icon: MapPinIcon,
  },
  {
    name: "Mitra Profesional",
    description:
      "Kami menghadirkan Mitra Spesialis terpercaya, melalui seleksi yang ketat dan bersertifikat yang akan melayani dengan ramah",
    icon: UserIcon,
  },
  {
    name: "Jaminan Kualitas",
    description:
      "Mitra melakukan pekerjaan sesuai aturan dan panduan dengan cermat, tepat, dan hati-hati untuk menjaga kualitas. ",
    icon: CheckIcon,
  },
];

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-yellow-500">
            About Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mengapa Menggunakan Josbos...?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Dengan aplikasi yang dirancang dengan sangat baik untuk memudahkan
            Pengguna saat melakukan pemesanan dengan 4 pilihan cara pesan
            sehingga mendapatkan layanan yang berkualitas dengan tarif yang
            hemat dan pas.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
