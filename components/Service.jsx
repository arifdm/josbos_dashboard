import { CheckCircleIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Cuci Mobil",
    description:
      "Layanan cuci mobil berkualitas dengan pilihan cuci body, cuci reguler, dan cuci premium.",
    icon: CheckCircleIcon,
  },
  {
    name: "Cuci Motor",
    description:
      "Layanan cuci motor berkualitas dengan pilihan cuci reguler dan cuci premium.",
    icon: CheckCircleIcon,
  },
  {
    name: "Layanan Darurat",
    description:
      "Layanan darurat seperti (mogok, jasa ganti ban, ganti aki, derek, dll) yang butuh penanganan segera.",
    icon: CheckCircleIcon,
  },
  {
    name: "Tenaga Ahli",
    description:
      "Tenaga ahli profesional dibidang otomotif yang siyap membantu Kamu.",
    icon: CheckCircleIcon,
  },
];

export default function Service() {
  return (
    <div id="service" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-yellow-500">
                Layanan Kami
              </h2>
              <p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Kami menghadirkan layanan perawatan dan perbaikan kendaraan yang
                berkualitas & terpercaya
              </p>
              {/* <p className="mt-6 text-lg leading-8 text-gray-600">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </p> */}
              <dl className="mt-10 max-w-xl space-y-4 text-base leading-7 text-gray-500 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-yellow-500 text-lg">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="inline">, {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="/images/serviceBg.jpg"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
