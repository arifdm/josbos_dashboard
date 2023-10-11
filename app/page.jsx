"use client";

import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

import About from "@/components/About";
import Blog from "@/components/Blog";
import Hero from "@/components/Hero";
import NavHome from "@/components/NavHome";
import UI from "@/components/UI";
import Footer from "@/components/Footer";

const Home = () => {
  // const router = useRouter();
  const { status, data: session } = useSession();
  console.log("SESSION: ", session?.user);
  // if (status === "unauthenticated") {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="bg-white">
      <NavHome status={status} />
      <Hero session={session} status={status} />
      <About />
      <UI />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
