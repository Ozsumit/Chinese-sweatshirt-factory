import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  Trophy,
  Medal,
  X,
  RefreshCw,
  ArrowLeft,
  DollarSign,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/cardninput";
import { Button } from "@/components/ui/buttonmsp";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Donor {
  _id: string;
  name: string;
  donation: number;
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1e33) return (num / 1e33).toFixed(2) + "D";
  if (num >= 1e30) return (num / 1e30).toFixed(2) + "N";
  if (num >= 1e27) return (num / 1e27).toFixed(2) + "O";
  if (num >= 1e24) return (num / 1e24).toFixed(2) + "Sep";
  if (num >= 1e21) return (num / 1e21).toFixed(2) + "S";
  if (num >= 1e18) return (num / 1e18).toFixed(2) + "Qt";
  if (num >= 1e15) return (num / 1e15).toFixed(2) + "Q";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(0);
};

const TopDonorsComponent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [topDonors, setTopDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTopDonors = async () => {
    setRefreshing(true);
    setError(null);
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) throw new Error("Failed to fetch top donors");
      const data = await response.json();
      setTopDonors(data);
    } catch (err) {
      setError("Unable to load leaderboard. Please try again.");
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopDonors();
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="text-amber-400 w-6 h-6" />;
      case 1:
        return <Medal className="text-slate-300 w-6 h-6" />;
      case 2:
        return <Medal className="text-amber-600 w-6 h-6" />;
      default:
        return <span className="text-slate-400 font-medium">{index + 1}</span>;
    }
  };

  return (
    <Card className="w-full h-full bg-slate-950/95 backdrop-blur-sm flex flex-col">
      {/* Improved header with more visible back button */}
      <CardHeader className="border-b border-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-amber-400 w-5 h-5" />
            <h2 className="text-lg font-semibold text-slate-100">Top Donors</h2>
          </div>
          <Button
            onClick={onClose}
            variant="secondary"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : error ? (
          <Alert
            variant="error"
            message=""
            className="bg-red-950/50 border-red-900"
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <ul className="space-y-3">
            {topDonors.map((donor, index) => (
              <li
                key={donor._id}
                className="group flex items-center justify-between bg-slate-900/50 rounded-lg p-3 transition-all hover:bg-slate-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index)}
                  </div>
                  <span className="text-slate-100 font-medium group-hover:text-white transition-colors">
                    {donor.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  {/* <DollarSign className="w-4 h-4" /> */}
                  <span className="font-mono font-medium">
                    {formatLargeNumber(donor.donation)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      {/* Footer with refresh button */}
      <div className="p-4 border-t border-slate-800">
        <Button
          onClick={fetchTopDonors}
          disabled={refreshing}
          variant="outline"
          className="w-full bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-800 hover:text-white"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh Leaderboard
        </Button>
      </div>
    </Card>
  );
};

const SidebarWrapper: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Enhanced toggle button with clear labeling */}
      <Button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 right-4 md:top-4 md:bottom-auto z-50 bg-slate-900 hover:bg-slate-800 text-slate-100 shadow-lg rounded-full px-4 py-2 flex items-center gap-2"
      >
        <LayoutGrid className="w-4 h-4 text-amber-400" />
        <span className="font-medium">View Leaderboard</span>
      </Button>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <TopDonorsComponent onClose={() => setIsSidebarOpen(false)} />
      </div>
    </>
  );
};

export default SidebarWrapper;
