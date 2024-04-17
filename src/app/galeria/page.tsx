import { NextPage } from "next"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria Description",
};

const page: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        PAGE GALERIA
      </main>
    </>
  )
}

export default page