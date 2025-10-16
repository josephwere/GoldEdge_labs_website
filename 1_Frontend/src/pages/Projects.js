import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">All Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
};

export default Projects;
