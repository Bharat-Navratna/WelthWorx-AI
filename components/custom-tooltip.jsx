"use client";

import React from "react";
import { useTheme } from "next-themes";

const CustomTooltip = ({ active, payload, label }) => {
  const { theme } = useTheme();

  if (active && payload && payload.length) {
    // Define colors depending on the theme.
    const backgroundColor = theme === "dark" ? "#333" : "#fff";
    const textColor = theme === "dark" ? "#fff" : "#333";

    return (
      <div
        className="p-2 rounded-md shadow-md"
        style={{
          backgroundColor,
          color: textColor,
          border: "1px solid",
          borderColor: theme === "dark" ? "#555" : "#ccc",
        }}
      >
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm">
            {entry.name}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
