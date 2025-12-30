import { createContext, useContext, useState } from "react";
import { PortfolioInfo } from "@/types/portfolio";

interface PortfolioInfoContextType {
  info: PortfolioInfo | null;
  setInfo: React.Dispatch<React.SetStateAction<PortfolioInfo | null>>;
}

const PortfolioInfoContext = createContext<PortfolioInfoContextType | null>(
  null
);

export const PortfolioInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [info, setInfo] = useState<PortfolioInfo | null>(null);

  return (
    <PortfolioInfoContext.Provider
      value={{ info, setInfo }}
    >
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
