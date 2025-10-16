import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-transparent text-white p-4 flex justify-between items-center">
      <div className="font-extrabold text-2xl gold">Joseph Were</div>
      <div className="space-x-4">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href="#leaderboard">Leaderboard</a>
      </div>
    </nav>
  );
};

export default Navbar;
