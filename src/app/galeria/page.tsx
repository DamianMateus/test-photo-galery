import { NextPage } from "next"
import type { Metadata } from "next";
import GaleryComponent from "@/components/galeryComponent/GaleryComponent";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Description",
};

const page: NextPage = () => {
  return (
    <>
      <GaleryComponent />
    </>
  )
}

export default page