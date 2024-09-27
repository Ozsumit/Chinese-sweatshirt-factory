import React, { useState, useEffect, useCallback } from "react";
interface Achievement {
  id: string;
  name: string;
  description: string;
  threshold: number;
  achieved: boolean;
  icon: React.ReactNode;
}

interface SpecialItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: (state: GameState) => Partial<GameState>;
  icon: React.ReactNode;
  duration: number;
}

interface GameState {
  donations: number;
  clickPower: number;
  autoClickerCount: number;
  autoClickerCost: number;
  upgradeCost: number;
  autoClickerby: number;
  clickPowerby: number;
  achievements: Achievement[];
  upgradeLevel: number;
  autoClickerLevel: number;
  specialItems: SpecialItem[];
  luckyCharmActive: boolean;
  donationMultiplierClicks: number;
  frostBonusActive: boolean;
  timeWarpActive: boolean;
  rainbowBoostActive: boolean;
  superNovaActive: boolean;
  specialItemBonus: {
    clickPower: number;
    autoClickerPower: number;
  };
}

interface TaxAlertProps {
  isOpen: boolean;
  onClose: () => void;
  taxAmount: number;
  taxRate: number;
}

const TaxAlert: React.FC<TaxAlertProps> = ({
  isOpen,
  onClose,
  taxAmount,
  taxRate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-red-600 p-8 rounded-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Surprise Tax!</h2>
        <p className="text-xl mb-4">
          {taxRate.toFixed(1)}% of your donations have been taken as tax!
        </p>
        <p className="text-2xl font-bold mb-6">
          {formatLargeNumber(taxAmount)} coins confiscated because you committed
          tax evasion
        </p>
        <button
          onClick={onClose}
          className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold text-xl"
        >
          Close
        </button>
      </div>
    </div>
  );
};

interface UseTaxAlertResult {
  TaxAlert: React.FC<TaxAlertProps>;
  showTaxAlert: boolean;
  taxAmount: number;
  taxRate: number;
  closeTaxAlert: () => void;
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1e33) return (num / 1e33).toFixed(2) + "D";
  if (num >= 1e30) return (num / 1e30).toFixed(2) + "N";
  if (num >= 1e27) return (num / 1e27).toFixed(2) + "O";
  if (num >= 1e24) return (num / 1e24).toFixed(2) + "S";
  if (num >= 1e21) return (num / 1e21).toFixed(2) + "S";
  if (num >= 1e18) return (num / 1e18).toFixed(2) + "Q";
  if (num >= 1e15) return (num / 1e15).toFixed(2) + "q";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(0);
};

const useTaxAlert = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseTaxAlertResult => {
  const [showTaxAlert, setShowTaxAlert] = useState<boolean>(false);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0);

  const applyTax = useCallback(() => {
    setGameState((prev) => {
      // Generate a random tax rate between 40% and 80%
      // Using a skewed distribution to favor higher rates
      const randomFactor = Math.pow(Math.random(), 0.3); // This will skew towards higher values
      const newTaxRate = 40 + randomFactor * 40; // This will result in a range from 40 to 80

      const actualTaxRate = newTaxRate / 100;
      const newTaxAmount = Math.floor(prev.donations * actualTaxRate);

      setTaxAmount(newTaxAmount);
      setTaxRate(newTaxRate);
      setShowTaxAlert(true);

      return {
        ...prev,
        donations: prev.donations - newTaxAmount,
      };
    });
  }, [setGameState]);

  const scheduleTax = useCallback(() => {
    // Random time between 30 seconds and 5 minutes (in milliseconds)
    const delay = Math.random() * (300000 - 30000) + 50000;
    setTimeout(() => {
      applyTax();
      scheduleTax(); // Schedule the next tax event
    }, delay);
  }, [applyTax]);

  useEffect(() => {
    scheduleTax(); // Initial scheduling
    return () => {}; // Cleanup function if needed
  }, [scheduleTax]);

  const closeTaxAlert = () => setShowTaxAlert(false);

  return { TaxAlert, showTaxAlert, taxAmount, taxRate, closeTaxAlert };
};

export default useTaxAlert;
