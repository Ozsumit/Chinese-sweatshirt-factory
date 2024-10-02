"use client";
// import { useState, useEffect } from "react";
import PWAInstallAndNotifications from "@/components/ui/install";
import SweatshirtFactory from "@/components/ui/game";
import DonationClicker from "@/components/ui/game";
import React, { useState, useEffect, useCallback } from "react";

import { toast, Toaster } from "sonner";
import Welcome from "@/components/ui/welcome";
import { Button } from "@/components/ui/buttonmsp";
import TopDonorsComponent from "@/components/ui/leaderboard";

const siteFeatures = ["Offline capability", "Reset Game", "Harder Gameplay"];
const reverseDonationFormat = (formattedValue: string): number => {
  const suffixes: { [key: string]: number } = {
    D: 1e33,
    N: 1e30,
    O: 1e27,
    S: 1e24,
    Q: 1e18,
    q: 1e15,
    T: 1e12,
    B: 1e9,
    M: 1e6,
    K: 1e3,
  };

  const regex = /^([\d.]+)([A-Za-z])$/;
  const match = formattedValue.match(regex);

  if (match) {
    const number = parseFloat(match[1]);
    const suffix = match[2];

    if (suffix in suffixes) {
      return number * suffixes[suffix];
    }
  }

  return parseFloat(formattedValue);
};
export default function Home() {
  const [userName, setUserName] = useState<string | null>(null);
  const [donations, setDonations] = useState<number | null>(null);

  const fetchData = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("userName");
      const donationValue = localStorage.getItem("donationClickerState7");

      if (storedName) {
        setUserName(storedName);
      } else {
        console.log("Username not found in localStorage.");
      }

      if (donationValue) {
        try {
          const parsedDonationData = JSON.parse(donationValue);
          const donations = parseFloat(parsedDonationData.donations);
          if (isNaN(donations)) {
            throw new Error("Invalid donation value");
          }
          setDonations(donations);
          console.log("Donations Value:", donations);
        } catch (error) {
          console.error("Error parsing donation data:", error);
        }
      } else {
        console.log("Donation value not found in localStorage.");
      }
    }
  }, []);

  const updateDonation = useCallback(async () => {
    if (userName && donations !== null) {
      try {
        const response = await fetch("/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            donation: donations,
          }),
        });

        const data = await response.json();
        console.log("Data updated:", data);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.log("UserName or Donation not found or invalid.");
    }
  }, [userName, donations]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(intervalId);
  }, [fetchData]);

  useEffect(() => {
    if (userName && donations !== null) {
      updateDonation();
    }
  }, [userName, donations, updateDonation]);

  const handleManualUpdate = () => {
    fetchData();
    updateDonation();
  };

  return (
    <>
      <Welcome features={siteFeatures} />
      <PWAInstallAndNotifications />
      <Toaster />
      <Button onClick={handleManualUpdate}>Update Manually</Button>
      <TopDonorsComponent />
      <div className="select-none">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <h1 className="text-4xl mt-10 md:text-6xl font-mono w-full md:w-6/12 justify-center items-center flex flex-col mb-6 md:mb-12 font-bold text-green-500">
            The Donation Game
          </h1>
          <h1 className="text-2xl w-auto border-b-2 p-[1%] border-yellow-400 md:text-4xl font-sans justify-center items-center flex flex-col font-bold text-yellow-400">
            {userName ? `Welcome, ${userName}` : "Welcome to the Donation Game"}
          </h1>
          <SweatshirtFactory />
        </main>
      </div>
    </>
  );
}
