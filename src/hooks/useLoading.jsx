import React, { useState } from "react";

// Custom hook to manage loading state
const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // Function to wrap async function and manage loading state
  const withLoading = async (asyncFunction, ...args) => {
    setLoading(true); // Start the spinner
    try {
      const result = await asyncFunction(...args);
      return result;
    } finally {
      setLoading(false); // Stop the spinner after async function completes
    }
  };

  return [loading, withLoading];
};

export default useLoading;
