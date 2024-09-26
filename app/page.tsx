"use client";
import PWAInstallAndNotifications from "@/components/ui/install";
import SweatshirtFactory from "@/components/ui/game";
import DonationClicker from "@/components/ui/game";
// import DonationClicker from "@components/ui/game";
// import Image from "next/image";
import { toast, Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <PWAInstallAndNotifications />
      <Toaster />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-lg">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-2xl md:text-4xl font-mono w-full md:w-6/12 justify-center items-center flex flex-col mb-6 md:mb-12 font-bold text-white">
            The Donation Game
          </h1>
          <SweatshirtFactory />
          {/* <button onClick={() => toast("Hello World")}>Hello World</button> */}
        </main>
      </div>
    </>
  );
}
