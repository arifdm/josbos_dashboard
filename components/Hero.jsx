import Image from "next/image";
import Link from "next/link";

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#1F1801" />
                <stop offset={1} stopColor="#FCB92D" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-yellow-500 sm:text-5xl">
              Rawat mobil sendiri merepotkan?
            </h1>
            <br />
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Gunakan Josbos sekarang
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Josbos adalah aplikasi yang menghadirkan layanan perawatan dan
              perbaikan kendaraan Kamu, yang dipesan secara online kapan saja di
              mana saja.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <Link
                href="#about"
                alt="Get Information"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Information
              </Link>
              <Link
                href="https://play.google.com/store/apps/details?id=com.josbos.consumer"
                alt="Google Play"
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
              >
                <div className="flex flex-row items-center">
                  <Image
                    src="/GooglePlay.png"
                    width={25}
                    height={25}
                    alt="Google Play"
                  />
                  <p className="ml-1">Google Play</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8 -z-10">
            <img
              className="absolute left-0 top-[-150px] lg:top-0 w-[50rem] lg:w-[70rem] max-w-none"
              src="/images/bmw-3-sedan-cover-779x447.png"
              alt="Car"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
