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
}

const TaxAlert: React.FC<TaxAlertProps> = ({ isOpen, onClose, taxAmount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-red-600 p-8 rounded-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Surprise Tax!</h2>
        <p className="text-xl mb-4">
          80% of your donations have been taken as tax!
        </p>
        <p className="text-2xl font-bold mb-6">
          {taxAmount.toLocaleString()} coins confiscated because you committed
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
  closeTaxAlert: () => void;
}

const useTaxAlert = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseTaxAlertResult => {
  const [showTaxAlert, setShowTaxAlert] = useState<boolean>(false);
  const [taxAmount, setTaxAmount] = useState<number>(0);

  const applyTax = useCallback(() => {
    setGameState((prev) => {
      const newTaxAmount = Math.floor(prev.donations * 0.2);
      setTaxAmount(newTaxAmount);
      setShowTaxAlert(true);
      return {
        ...prev,
        donations: prev.donations - newTaxAmount,
      };
    });
  }, [setGameState]);

  const scheduleTax = useCallback(() => {
    // Random time between 1 and 4 minutes (in milliseconds)
    const delay = Math.random() * (240000 - 60000) + 60000;
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

  return { TaxAlert, showTaxAlert, taxAmount, closeTaxAlert };
};

export default useTaxAlert;
