"use client";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { PortfolioInfo } from "@/types/portfolio";
import { portfolioService } from "@/services/portfolio.service";

interface PortfolioInfoContextType {
  info: PortfolioInfo | null;
  setInfo: React.Dispatch<React.SetStateAction<PortfolioInfo | null>>;
}

const PortfolioInfoContext =
  createContext<PortfolioInfoContextType | null>(null);


export const PortfolioInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [info, setInfo] = useState<PortfolioInfo | null>(null);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchInfo = async () => {
      try {
        const data = await portfolioService.getInfo();
        setInfo(data);
      } catch (error) {
        console.error("Failed to fetch portfolio info:", error);
      }
    };

    fetchInfo();
  }, []);

  const value = useMemo(
    () => ({ info, setInfo }),
    [info]
  );

  return (
    <PortfolioInfoContext.Provider value={value}>
      {children}
    </PortfolioInfoContext.Provider>
  );
};


export const usePortfolioInfoContext = (): PortfolioInfoContextType => {
  const context = useContext(PortfolioInfoContext);

  if (!context) {
    throw new Error(
      "usePortfolioInfoContext must be used within PortfolioInfoProvider"
    );
  }

  return context;
};
