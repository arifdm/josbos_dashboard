// "use client";
// import { useSession } from "next-auth/react";

const Mainboard = async () => {
  // const { status, data: session } = await useSession();
  // console.log("SESSION: ", status, session);

  return (
    <div className="bg-white">
      <div>Mainboard</div>
      {/* <div>
        User: {session?.user?.name}, {session?.user?.email}
      </div> */}
    </div>
  );
};

export default Mainboard;
