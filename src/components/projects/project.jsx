import './proejcts.css';
import projects from "../../data/projects_page.json";

function Projects() {
  return (
    <div className="projects-page-section" id="projects-page">
      <div className="projects-header">
        <h2 className="projects-heading">My Projects</h2>
        <p className="projects-subheading">A selection of my recent work</p>
      </div>

      <div className="projects-cards-container">
        {projects.map((project, idx) => (
          <div className="theme-project-card" key={idx}>
            <div className="theme-card-image-wrap">
              <img src={project.project_thumb} alt={project.title} className="theme-card-img" />
              <div className="theme-card-overlay">
                <a href={project.link} className="theme-card-link" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-box-arrow-up-right"></i> View Project
                </a>
              </div>
            </div>
            <div className="theme-card-content">
              <div className="theme-card-top">
                <img src={project.project_ico} alt={`${project.title} icon`} className="theme-card-icon" />
                <h3 className="theme-card-title">{project.title}</h3>
              </div>
              <p className="theme-card-desc">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
