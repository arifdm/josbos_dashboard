"use client";

import NavHome from "@/components/NavHome";
import Image from "next/image";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="bg-white">
      {/* <NavHome /> */}

      <div className="mx-auto max-w-4xl py-9 lg:px-8">
        <Link href="/">
          <Image
            className="h-8 w-auto"
            width={135}
            height={32}
            src="/Logo.png"
            alt="Logo"
          />
        </Link>
        <div className="mx-auto max-w-4xl mt-10 py-6">
          <h2 className="text-base font-semibold leading-7 text-yellow-500 lg:text-center">
            Privacy Policy
          </h2>
          <p className="mt-2 text-3xl font-bold text-gray-700 text-center">
            Kebijakan Privasi
          </p>
          <p className="mt-6 leading-6 text-gray-600">
            <br />
            Kebijakan privasi ini mengatur tentang cara kami, mengumpulkan dan
            memproses data Anda dalam layanan kami (sebagaimana didefinisikan di
            bawah). Kami memiliki komitmen tinggi terhadap perlindungan Data
            Pribadi (sebagaimana didefinisikan di bawah) Anda. Kami bertanggung
            jawab untuk menegakkan prinsip-prinsip pengurusan data dengan
            integritas yang penuh, sehingga keamanan Data Pribadi Anda menjadi
            prioritas utama kami. Kebijakan ini berlaku untuk semua pengguna
            Layanan yang mengakses melalui situs web dan aplikasi seluler,
            termasuk setiap pihak manapun yang bekerjasama dengan kami, kecuali
            diatur pada kebijakan privasi yang terpisah.
            <br />
            <br />
            Dengan menggunakan Layanan, Anda mengakui bahwa Anda telah
            menyetujui dan terikat dengan ketentuan yang terdapat dalam
            Kebijakan ini. Oleh karena itu, kami berharap Anda membaca Kebijakan
            ini untuk memastikan bahwa Anda mengerti bagaimana cara kami
            menangani Data Pribadi Anda.
            <p className="font-bold text-md mb-2 mt-8">Definisi</p>
            &quot;Data Pribadi&quot; berarti data tentang orang perseorangan
            yang teridentifikasi atau dapat diidentifikasi secara tersendiri
            atau dikombinasi dengan Informasi lainnya baik secara langsung
            maupun tidak langsung.
            <br />
            <br />
            &quot;Informasi&quot; berarti keterangan, pernyataan, gagasan, dan
            tanda-tanda yang mengandung nilai, makna, dan pesan, baik data,
            fakta, maupun penjelasannya yang dapat dilihat, didengar, dan dibaca
            yang disajikan dalam berbagai kemasan dan format sesuai dengan
            perkembangan teknologi informasi dan komunikasi secara elektronik
            ataupun nonelektronik.
            <br />
            <br />
            &quot;Hukum Yang Berlaku&quot; berarti seluruh undang-undang,
            perundangan, peraturan, kebijakan peraturan, ordonansi, pengesahan,
            izin atau persyaratan dari peradilan, badan administratif, otoritas,
            atau badan pengawas apapun, yang berlaku dari waktu ke waktu.
            <p className="font-bold text-md mb-2 mt-8">
              Data Pribadi yang Kami Kumpulkan
            </p>
            Berikut adalah ruang lingkup dan jenis Data Pribadi tentang Anda
            yang akan kami proses sehubungan dengan penggunaan Layanan oleh Anda
            (sebagaimana berlaku, yakni tergantung kepada konteks atau keadaan
            dari pengumpulan dan sifat dari Layanan yang digunakan atau
            transaksi yang dilakukan):
            <p className="mt-4">
              Data Identitas, antara lain: nama, nomor handphone, dan email;
            </p>
            {/* 
            <p className="mt-4">Data Identitas, termasuk namun tidak terbatas pada, nama, jenis kelamin, alamat, tempat dan tanggal lahir, data swafoto, dan selainnya;</p>
            <p className="mt-4">
              Data Pembayaran atau Keuangan, termasuk namun tidak terbatas pada,
              rincian rekening bank, informasi keuangan, dan selainnya;
            </p>
            <p className="mt-4">
              Data yang berhubungan dengan aktivitas Anda pada saat penggunaan
              Layanan, termasuk namun tidak terbatas pada, istilah yang Anda
              telusuri, tampilan dan interaksi dengan konten, aktivitas input
              dan proses transaksi, orang yang berkomunikasi dengan Anda atau
              berbagi konten dengan Anda, aktivitas di situs dan aplikasi Pihak
              Ketiga (sebagaimana didefinisikan di bawah) yang menggunakan
              Layanan Kami.
            </p> */}
            <p className="mt-4">
              Data Lokasi. Kami mengumpulkan informasi tentang lokasi Anda saat
              Anda menggunakan Layanan Kami.
              {/* Lokasi Anda dapat ditentukan dengan
              berbagai tingkat akurasi menggunakan GPS, alamat IP, data sensor
              dari perangkat Anda, Informasi tentang yang ada di dekat perangkat
              Anda, seperti titik akses Wi-Fi, menara seluler, dan perangkat
              yang mengaktifkan bluetooth. Misalnya,  */}
              Anda dapat mengaktifkan atau menonaktifkan lokasi perangkat
              Android menggunakan aplikasi pengaturan perangkat.
              {/* Kami
              menggunakan berbagai teknologi untuk mengumpulkan dan menyimpan
              informasi, termasuk cookie, penyimpanan lokal, seperti penyimpanan
              browser web atau cache data aplikasi, database, dan log server. */}
            </p>
            <p className="font-bold text-md mb-2 mt-8">
              Cara Kami Mengumpulkan Data
            </p>
            Data Pribadi Anda dapat kami kumpulkan melalui beberapa cara, yakni:
            melalui pemberian oleh Anda secara langsung ketika mendaftar atau
            menggunakan Layanan atau ketika Anda menghubungi layanan pelanggan
            Kami;
            <br />
            <br />
            Kami mengumpulkan informasi ini saat Layanan di perangkat Anda
            menghubungi server kami dan saat Anda menginstal aplikasi dari Play
            Store.
            <p className="font-bold text-md mb-2 mt-8">Keamanan Data Pribadi</p>
            Kami juga selalu berusaha meningkatkan keamanan Data Pribadi Anda
            dengan menggunakan teknologi terbaru dan mematuhi peraturan yang
            berlaku untuk memenuhi harapan pihak terkait, dan untuk memastikan
            peningkatan kualitas yang berkelanjutan. Selanjutnya, kami
            menjadikan perlindungan Data Pribadi Anda sebagai prioritas kami
            dengan menggunakan standar tertinggi untuk mengamankan Data Pribadi
            Anda.
            <br />
            <br />
            Meskipun Kami akan berusaha untuk menjaga Data Pribadi Anda, kami
            tidak dapat menjamin keutuhan dan keakuratan Data Pribadi yang Anda
            berikan melalui internet mengingat pengiriman informasi melalui
            internet tidak sepenuhnya aman. Anda bertanggung jawab untuk menjaga
            kerahasiaan akun Anda dan Anda harus selalu menjaga dan bertanggung
            jawab atas keamanan perangkat yang Anda gunakan.
            <p className="font-bold text-md mb-2 mt-8">Kontak</p>
            Apabila Anda ingin mengajukan pertanyaan mengenai pemrosesan Data
            Anda atau pertanyaan lainnya sehubungan dengan Kebijakan ini,
            silakan menghubungi kami melalui email: policy@josbos.com
          </p>
        </div>
      </div>
    </div>
  );
}
