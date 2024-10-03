import React, { useState, useEffect } from "react";
import { FaUserTie, FaMoneyBillWave, FaSync } from "react-icons/fa";

interface Donor {
  _id: string;
  name: string;
  donation: number;
}

const TopDonorsComponent: React.FC = () => {
  const [topDonors, setTopDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopDonors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leaderboard");
      if (!response.ok) {
        throw new Error("Failed to fetch top donors");
      }
      const data = await response.json();
      setTopDonors(data);
    } catch (err) {
      setError("Error fetching top donors. Please try again.");
      console.error("Error fetching top donors:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTopDonors();
  }, []);

  const formatDonation = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {}).format(amount);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-900 shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-center text-white">
          Top 5 Donors{" "}
          <FaUserTie className="inline-block ml-2 text-yellow-400" />
        </h2>
      </div>
      <div className="p-4 md:p-6">
        {isLoading ? (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                    <FaUserTie className="inline-block mr-1" /> Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <FaMoneyBillWave className="inline-block mr-1" /> Donation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-700">
                {topDonors.map((donor, index) => (
                  <tr key={donor._id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">
                      {donor.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400 text-right">
                      {formatDonation(donor.donation)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-4 flex justify-center">
          <button
            onClick={fetchTopDonors}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            <FaSync className="mr-2" />
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDonorsComponent;
