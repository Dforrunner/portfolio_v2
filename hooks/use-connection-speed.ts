'use client';

import { useState, useEffect } from "react";

export function useConnectionSpeed() {
  const [isGoodConnection, setIsGoodConnection] = useState(true);

  useEffect(() => {
    // Check if Network Information API is available
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    if (connection) {
      const effectiveType = connection.effectiveType;
      // Only load iframe on 4g or better connections
      setIsGoodConnection(effectiveType === "4g" || effectiveType === "wifi");

      const handleChange = () => {
        const newType = connection.effectiveType;
        setIsGoodConnection(newType === "4g" || newType === "wifi");
      };

      connection.addEventListener("change", handleChange);
      return () => connection.removeEventListener("change", handleChange);
    }
  }, []);

  return isGoodConnection;
}