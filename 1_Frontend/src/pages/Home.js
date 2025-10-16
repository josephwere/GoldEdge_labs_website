import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ProfileCard from '../components/ProfileCard';
import ProjectCard from '../components/ProjectCard';
import CountdownTimer from '../components/CountdownTimer';
import AIChatWidget from '../components/AIChatWidget';
import axios from 'axios';

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get((process.env.REACT_APP_API_URL || "") + '/api/projects');
        setProjects(res.data);
      } catch (e) {
        setProjects([]);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white">
      <HeroSection />
      <div className="container mx-auto py-8">
        <ProfileCard />
        <h2 className="text-3xl font-bold mt-10 mb-4">Upcoming Projects</h2>
        <CountdownTimer />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {projects.length ? projects.map((p,i) => <ProjectCard key={i} project={p} />) : <ProjectCard />}
        </div>
      </div>
      <AIChatWidget />
    </div>
  );
};

export default Home;
