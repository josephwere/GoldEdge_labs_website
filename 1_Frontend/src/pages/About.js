import React from 'react';
import ProfileCard from '../components/ProfileCard';

const About = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Joseph Were</h1>
        <ProfileCard />
        <p className="mt-6 text-lg leading-relaxed">
          Joseph Were, Founder of GoldEdge Labs. Passionate about building future-proof AI systems and products.
        </p>
      </div>
    </div>
  );
};

export default About;
