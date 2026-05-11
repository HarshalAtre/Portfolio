import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import { formatPeriod, sortExperienceByDate } from '../../utils/experienceDates';

function Experiences({ enter, leave }) {
  const { portfolioData } = useSelector((state) => state.root);
  const experience = sortExperienceByDate(portfolioData?.experience || []);

  if (!experience.length) {
    return null;
  }

  return (
    <section onMouseEnter={enter} onMouseLeave={leave}>
      <SectionTitle title="Experience" />

      <div className="mb-12">
        <h2 className="text-white text-4xl sm:text-3xl font-semibold leading-tight">
          Experience that
          <span className="text-secondary"> speaks for itself.</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-3xl">
          A quick timeline of roles, responsibilities, and hands-on work that
          shaped my development journey.
        </p>
      </div>

      <div className="relative pb-3">
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-tertiary via-[#52C7C288] to-transparent [box-shadow:0_0_24px_rgba(82,199,194,0.6)] sm:left-3 sm:translate-x-0" />

        <div className="space-y-10">
          {experience.map((exp, index) => {
            const isCurrent = index === 0;
            const onLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative grid grid-cols-2 gap-10 sm:grid-cols-1 sm:pl-10"
              >
                <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-tertiary ring-4 ring-primary z-10 sm:left-3 sm:translate-x-0">
                  {isCurrent && (
                    <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75" />
                  )}
                </div>

                <div
                  className={`${
                    onLeft
                      ? 'col-start-1 pr-10 text-right'
                      : 'col-start-2 pl-10 text-left'
                  } sm:col-start-1 sm:pl-0 sm:pr-0 sm:text-left`}
                >
                  <div className="rounded-2xl border border-[#52C7C244] bg-[#0d2447]/70 p-6 transition-all duration-300 hover:border-tertiary hover:[box-shadow:0_0_24px_rgba(82,199,194,0.35)]">
                    <span className="text-sm font-medium text-tertiary">
                      {formatPeriod(exp.period)}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {exp.title}
                    </h3>
                    <p className="text-secondary font-medium">{exp.company}</p>
                    <p className="mt-4 text-sm text-gray-300 whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experiences;
