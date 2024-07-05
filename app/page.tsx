// pages/index.tsx
"use client";
import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second load
  }, []);



  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomePage;
