import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import { projects as fallbackProjects } from '../../resources/projects';

const parseProjectPositionAndDescription = (rawDescription = '') => {
  const descriptionText = String(rawDescription || '');
  const match = descriptionText.match(/^\s*(\d+)\s*(?:\r?\n)+([\s\S]*)$/);

  if (!match) {
    return {
      position: Number.MAX_SAFE_INTEGER,
      description: descriptionText,
    };
  }

  return {
    position: Number(match[1]),
    description: match[2].trimStart(),
  };
};

function Projects({ enter, leave }) {
  const { portfolioData } = useSelector((state) => state.root);
  const apiProjects = Array.isArray(portfolioData?.projects) ? portfolioData.projects : [];
  const projects = apiProjects.length > 0 ? apiProjects : fallbackProjects;
  const sortedProjects = projects
    .map((project, index) => {
      const parsedMeta = parseProjectPositionAndDescription(project.description);
      return {
        ...project,
        description: parsedMeta.description,
        _position: parsedMeta.position,
        _initialIndex: index,
      };
    })
    .sort((a, b) => {
      if (a._position !== b._position) {
        return a._position - b._position;
      }
      return a._initialIndex - b._initialIndex;
    });

  return (
    <section onMouseEnter={enter} onMouseLeave={leave} className="projects-section relative py-10">
      <SectionTitle title="Projects" />

      <div className="projects-section__intro text-center mx-auto max-w-3xl mb-12">
        <h2 className="projects-section__title text-4xl sm:text-3xl font-semibold mt-2 mb-4 text-white">
          Some Things I've Built
        </h2>
        <p className="projects-section__subtitle text-gray-400">
          A selection of my recent work with real-world applications and hands-on builds.
        </p>
      </div>

      <div className="projects-section__grid grid grid-cols-2 md:grid-cols-1 gap-8">
        {sortedProjects.map((project, idx) => {
          const tags = Array.isArray(project.technologies) ? project.technologies : [];
          const hasLink = Boolean(project.link);
          const imageSrc = project.image || '/logo512.png';

          return (
            <article
              key={`${project.id || project.title || idx}`}
              className="projects-section__card group rounded-2xl overflow-hidden border border-[#1f436f] bg-[#10294d] hover:border-tertiary transition-all duration-300 hover:-translate-y-1 hover:[box-shadow:0_14px_30px_rgba(2,12,27,0.6)]"
            >
              <div className="relative overflow-hidden aspect-video bg-[#081932]">
                <img
                  src={imageSrc}
                  alt={project.title || 'Project image'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/logo512.png';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#081932] via-[#081932aa] to-transparent opacity-60" />

                {hasLink && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} external link`}
                      className="p-3 rounded-full border border-tertiary bg-[#081932cc] text-tertiary hover:bg-tertiary hover:text-primary transition-all"
                    >
                      ↗
                    </a>
                  </div>
                )}
              </div>

              <div className="projects-section__content p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="projects-section__card-title text-xl font-semibold text-white group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  {hasLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 group-hover:text-secondary transition-colors"
                      aria-label={`${project.title} link icon`}
                    >
                      <img src="/external-link.png" alt="" className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, tagIdx) => (
                      <span
                        key={`${tag}-${tagIdx}`}
                        className="px-3 py-1 rounded-full bg-[#0b2140] text-xs font-medium border border-[#1f436f] text-tertiary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {sortedProjects.length === 0 && (
        <div className="rounded-lg border border-[#1f436f] bg-[#10294d] p-6 mt-8">
          <p className="text-gray-300">No projects available yet.</p>
        </div>
      )}
    </section>
  );
}

export default Projects;
