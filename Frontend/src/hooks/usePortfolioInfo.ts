"use client";

import { useEffect } from "react";
import { usePortfolioInfoContext } from "../app/context/PortfolioInfoContext";
import { portfolioService } from "@/services/portfolio.service";
import { useToast } from "@/app/context/ToastContext";
export const usePortfolioInfo = () => {
  const { showToast } = useToast();

  const { info, setInfo } = usePortfolioInfoContext();

  useEffect(() => {
    const loadInfo = async () => {
      try {
        const data = await portfolioService.getInfo();
        setInfo(data);
      } catch (err: any) {
        console.error("Error portfolio info:", err);
        showToast({
          message: err.message || "Failed to load portfolio info",
          type: "error",
        });
      }
    };

    loadInfo();
  }, []);

  return { info };
};
