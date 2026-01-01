"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export const PDFModal = ({ isOpen, onClose, pdfUrl, title }: PDFModalProps) => {

    console.log("rendering PDFModal")

    useEffect(() => {
      console.log("PDFModal mounted")
      return () => {
        console.log("PDFModal unmounted")
      }
    }, [])

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-800">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <span className="text-pink-500">📄</span>
                {title}
              </h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-pink-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[calc(100%-80px)] overflow-auto">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-none"
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};