import Image from "next/image";
import Navbar from "./Components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2x1:mx-[16rem] m-auto">
      <Navbar/>
    </main>
  );
}
