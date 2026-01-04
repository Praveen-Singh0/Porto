"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoginModal from "../LoginModal";
import SignUpModal from "./SignUpModal";

type AuthView = "login" | "signup";

interface Props {
  isOpen: boolean;
  onClose: () => void; // closes from Header
}

const AuthModalController: React.FC<Props> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>("login");

  const handleCloseAll = () => {
    setView("login"); 
    onClose();
  };

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isOpen && (
        view === "login" ? (
          <LoginModal
            key="login"
            isOpen={true}
            onClose={handleCloseAll}
            onSignup={() => setView("signup")}
          />
        ) : (
          <SignUpModal
            key="signup"
            isOpen={true}
            onClose={handleCloseAll}
            onLogin={() => setView("login")}
          />
        )
      )}
    </AnimatePresence>
  );
};

export default AuthModalController;
