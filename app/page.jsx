"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavHome from "@/components/NavHome";
import Service from "@/components/Service";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { status, data: session } = useSession();
  // console.log("SESSION_USER: ", session?.user?.email);
  if (status === "authenticated") {
    router.push("/mainboard");
  }

  useEffect(() => {
    async () => {
      try {
        const res = await axios.get(`/api/user/${session?.user?.email}`);
        console.log("RES: ", res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, [session?.user?.email]);

  console.log("USER: ", user);

  return (
    <div className="bg-white mx-auto max-w-7xl">
      <NavHome session={session} status={status} />
      <Hero session={session} status={status} />
      <About />
      <Service />
      <Footer />
    </div>
  );
};

export default Home;
