import { NextPage } from "next"
import type { Metadata } from "next";
import GaleryComponent from "@/components/galeryComponent/GaleryComponent";
import Navbar from "@/components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Description",
};

const page: NextPage = () => {
  return (
    <>
      <Navbar/>
      <GaleryComponent />
    </>
  )
}

export default page