import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("TBA");

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        setTimeLeft("Now Live!");
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return <span className="text-yellow-400 font-bold">{timeLeft}</span>;
};

export default CountdownTimer;
