import React from "react";

const Footer = () => {
  return (
    <footer className="bg-transparent text-white text-center p-6 mt-8">
      © 2025 Joseph Were · Founder of GoldEdge Labs
    </footer>
  );
};

export default Footer;


export const FooterCredit = () => (<p className="text-center text-sm text-gray-500 mt-4">© {new Date().getFullYear()} GoldEdge Labs — Crafted by Joseph Were.</p>);
