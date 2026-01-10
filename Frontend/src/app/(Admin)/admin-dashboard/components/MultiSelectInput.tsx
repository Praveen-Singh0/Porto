"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";

interface MultiSelectInputProps {
  label?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  required?: boolean;
  addButtonText?: string;
  emptyMessage?: string;
  showAddButton?: boolean; // ✅ New prop
}

export default function MultiSelectInput({
  label,
  items,
  onChange,
  placeholder = "Add item...",
  required = false,
  addButtonText = "Add",
  emptyMessage = "No items added yet",
  showAddButton = true, // ✅ Default true
}: MultiSelectInputProps) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInput("");
    }
  };

  const removeItem = (item: string) => {
    onChange(items.filter((i) => i !== item));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
   <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* ✅ Only show input + add button if showAddButton is true */}
      {showAddButton && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{addButtonText}</span>
          </button>
        </div>
      )}
      
      {/* Tags display (always shown) */}
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400 rounded-full text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="hover:text-violet-900 dark:hover:text-violet-200 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          {emptyMessage}
        </p>
      )}
    </div>
  );
};