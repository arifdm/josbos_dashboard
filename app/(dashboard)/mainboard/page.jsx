// "use client";
// import { useSession } from "next-auth/react";

const Mainboard = async () => {
  // const { status, data: session } = await useSession();
  // console.log("SESSION: ", status, session);

  return (
    <div className="bg-white">
      <div className="text-xl font-semibold mb-5">Dashboard</div>
    </div>
  );
};

export default Mainboard;
