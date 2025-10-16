import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-lg m-2">
      <img src={project?.image || '/assets/images/project-placeholder.png'} alt={project?.title || 'Project'} className="w-full h-40 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{project?.title || 'Untitled Project'}</h3>
      <p>{project?.description || 'No description yet.'}</p>
    </div>
  );
};

export default ProjectCard;
