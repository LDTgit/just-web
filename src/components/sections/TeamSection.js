import React from 'react';
import './TeamSection.css';

const lawyers = [
  {
    name: 'Mihai Dumitrescu',
    title: 'Avocat coordonator',
    description:
      'Acordă sprijin juridic pentru persoane fizice și companii, cu accent pe dreptul afacerilor, insolvență și disputele comerciale.',
    accent: '#0d1b2a',
    // photo: require('../../assets/images/mihai_dumitrescu.jpg'),
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
    {
    name: 'Andreea Ionescu',
    title: 'Avocat senior',
    description:
      'Specializată în drept civil, achiziții publice și litigii comerciale, oferă consultanță strategică și reprezentare profesională în procese complexe.',
    accent: '#d9a21b',
    // photo: require('../../assets/images/andreea_ionescu.jpg'),
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
];

const TeamSection =() => {
  return (
    <section className="team-section">
      <div className="team-container">
        {/* Text si Carduri Avocati */}
        <div className="team-text-block">
          <p className="team-title">
            Echipa noastră
          </p>

          <h2 className="team-subtitle">
            Avocați dedicați soluțiilor juridice eficiente.
          </h2>

          <p className="team-description">
            La firma noastră, fiecare client primește atenție personalizată și
            strategii juridice adaptate nevoilor sale. Echipa noastră combină
            experiența profesională cu o abordare colaborativă, pentru a oferi
            soluții clare și rapide în fiecare caz.
          </p>

          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.name}
                className="lawyer-card"
                style={{ border: `2px solid ${lawyer.accent}22` }}
              >
                <div
                    className="lawyer-initials"
                    style={{ backgroundColor: lawyer.accent }}>
                  {lawyer.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </div>

                <h3
                  className="lawyer-name"
                >
                  {lawyer.name}
                </h3>

                <p
                    className="lawyer-title"
                    style={{ color: lawyer.accent }}
                >
                  {lawyer.title}
                </p>

                <p
                  className="lawyer-description"
                >
                  {lawyer.description}
                </p>
                <div className="lawyer-photo-wrapper">
                  <img
                    src={lawyer.src}
                    alt={lawyer.name}
                    className="lawyer-photo"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
