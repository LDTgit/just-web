import React from 'react';
import './CookiePolicy.css';


const dataActualizare = new Date("2026-08-23").toLocaleDateString('ro-RO');

function CookiePolicy() {
    const cookieCategories = [
        {
            id: 'necesary',
            title: "1. Cookie-uri Strict Necesare",
            status: "Întotdeauna active",
            description: 'Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului și nu pot fi dezactivate în sistemele noastre. Ele sunt setate doar ca răspuns la acțiunile efectuate de dumneavoastră (ex. setările de confidențialitate, autentificarea sau completarea formularelor).',
            examples: [
                { name: 'session_id', provider: 'Propriu', purpose: 'Menținerea sesiunii utilizatorului', duration: 'Sesiune' },
                { name: 'cookie_consent', provider: 'Propriu', purpose: 'Stochează consimțământul utilizatorului cu privire la categoriile de cookie-uri acceptate de utilizator pe site.', duration: '1 an' }
            ]
        },
        {
            id: 'functional',
            title: "2. Cookie-uri Funcționale",
            status: "Opțional",
            description: 'Aceste cookie-uri sunt necesare pentru funcționarea corectă a hărții.',
            examples: [
                { name: 'cookie_functional_consent', provider: 'Propriu', purpose: 'Stochează consimțământul utilizatorului cu privire la categoriile de cookie-uri acceptate de utilizator pe site.', duration: '1 an' },
                { name: 'NID', provider: 'Google Maps (Google LLC)', purpose: 'Stochează preferințele utilizatorului de a afișa harta interactive din pagina de contact.', duration: '1 an' },
                { name: 'AEC / SOCS', provider: 'Google Maps (Google LLC)', purpose: 'Menține starea consimțământului utilizatorului și opțiunile de securitate ale serviciilor Google embedded.', duration: '6 luni - 13 luni' }
            ]
        },
        {
            id: 'analytics',
            title: '3. Cookie-uri de Analiză și Performanță',
            status: 'Opțional',
            description: 'Ne permit să numărăm vizitele și sursele de trafic pentru a măsura și îmbunătăți performanța site-ului nostru. Ne ajută să știm ce pagini sunt cele mai populare și sum se deplasează vizitatorii pe site.',
            examples: [
                { name: '_ga', provider: 'Google Analytics', purpose: 'Diferențierea utilizatorilor unici', duration: '2 ani' },
                { name: '_gid', provider: 'Google Analytics', purpose: 'Distincția utilizatorilor', duration: '24 ore' }
            ]
        },
        {
            id: 'marketing',
            title: '4. Cookie-uri de Marketing și Targetare',
            status: 'Opțional',
            description: 'Aceste cookie-uri pot fi setate prin site-ul nostru de partenerii noștri de publicitate. Pot fi utilizate de aceste companii pentru a crea un profil al intereselor dumneavoastră și pentru a vă afișa reclame relevante pe alte site-uri.',
            examples: [
                { name: '_fbp', provider: 'Meta Platforms', purpose: 'Urmărirea conversiilor din reclame', duration: '3 luni' },
            ]
        },
    ];

    return (
        <div className='cookie-main-container'>
            <header className='cookie-header-container'>
                <h1 className='cookie-title'>Politica privind Modulele Cookie</h1>
                <p className='cookie-subtitle'>Ultima actualizare: {dataActualizare}</p>
            </header>

            <section className='introSection'>
                <p className='paragraph'>
                    Această politică explică modul în care utilizăm modulele cookie și tehnologiile similare pentru a vă recunoaște atunci când vizitați site-ul nostru. Explică ce sunt aceste tehnologii și de ce le folosim, precum și drepturile dumneavostră de a controla utilizarea lor.
                </p>
            </section>

            <div className='manageBox'>
                <h3 className='manageTitle'>Gestionarea Preferințelor</h3>
                <p className='paragraph'>Puteți modifica în orice moment preferințele privind cookie-urile neesențiale ajustând setările din browserul dumneavoastră sau din bannerul dedicat confidențialității.</p>
            </div>

            <h2 className='sectionHeading'>Tipuri de cookie-uri utilizate</h2>
            <div className='accordionGroup'>
                {cookieCategories.map((category) => (
                    <div key={category.id} className='card'>
                        <div className='cardHeader'>
                            <h3 className='cardTitle'>{category.title}</h3>
                            <span className={category.status === 'Întotdeauna active' ? 'badgeActive' : 'badgeOptional'}>
                                {category.status}
                            </span>
                        </div>
                        <p className='paragraph'>{category.description}</p>

                        <div className='table-wrapper'>
                            <table className='cookiesTable'>
                                <thead>
                                    <tr>
                                        <th className='tableHead'>Nume Cookie</th>
                                        <th className='tableHead'>Furnizor</th>
                                        <th className='tableHead'>Scop</th>
                                        <th className='tableHead'>Expirare</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.examples.map((item, index) => (
                                        <tr key={index} className='tableRow'>
                                            <td className='tableCell'>
                                                <code>{item.name}</code>
                                            </td>
                                            <td className='tableCell'>{item.provider}</td>
                                            <td className='tableCell'>{item.purpose}</td>
                                            <td className='tableCell'>{item.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                ))}
            </div>

            <section className='cookie-footer-section'>
                <h2 className='sectionHeading'>Cum puteți controla cookie-urile în browser?</h2>
                <p className='paragraph'>Majoritatea browserelor web vă permit să controlați majoritatea cookie-urilor prin intermediul setărilor. Pentru a afla mai multe despre gestionarea și ștergerea cookie-urilor, vizitați {''}
                    <a href='https://www.aboutcookies.org' target='_blank' rel='noopener noreferrer' className='cookiesLink'>
                        aboutcookies.org
                    </a>
                </p>
            </section>
        </div>
    );
};

export default CookiePolicy;