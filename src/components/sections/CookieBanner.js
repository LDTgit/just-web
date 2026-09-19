import React, { useState, useEffect } from "react";
import './CookieBanner.css'
import CookiePolicy from "./CookiePolicy";
import { setCookie, getCookie } from "../utils/cookieUtils";

function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [showFullPolicy, setShowFullPolicy] = useState(false);

    const [openDropdowns, setOpenDropdowns] = useState({});

    const [preferences, setPreferences] = useState({
        functionality: true,
        security: false,
        personalization: false,
        advertising: false,
        userData: false,
        adPersonalization: false,
        analytics: false,
    });

    useEffect(() => {
        // Verificam daca utilizatorul a facut o alegere anterior
        const consent = getCookie('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        } else {
            try {
                const parsedConsent = JSON.parse(consent);
                setPreferences(parsedConsent);
            } catch (e) {
                console.error("Error parsing consent from localStorage", e);
            }
        }

        // Ascultam evenimentele de actualizare emise din alte componende, de ex. butonul de pe harta Google Maps
        const handleConsentUpdate = () => {
            const isFunctionalAccepted = getCookie('cookie_functional_consent') === 'true';
            setPreferences((prev) => ({
                ...prev,
                personalization: isFunctionalAccepted,
            }));
        };

        window.addEventListener('cookie_consent_updated', handleConsentUpdate);
        return () => {
            window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
        };

    }, []);

    const saveConsent = (selectedPreferences) => {
        setCookie('cookie_consent', JSON.stringify(selectedPreferences));
        const hasFunctionalConsent = !!selectedPreferences.personalization;
        setCookie('cookie_functional_consent', hasFunctionalConsent ? 'true' : 'false');
        window.dispatchEvent(new Event('cookie_consent_updated'));
        setIsVisible(false);
    };

    const handleToggle = (key) => {
        if (key === 'functionality') return; //Nu se poate debifa
        setPreferences((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const toggleDropdown = (key) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleAcceptAll = () => {
        const allAccepted = {
            functionality: true,
            security: true,
            personalization: true,
            userData: true,
            adPersonalization: true,
            analytics: true,
        };
        setPreferences(allAccepted);
        saveConsent(allAccepted);
    };

    const handleAcceptNecessary = () => {
        const necessaryOnly = {
            functionality: true,
            security: false,
            personalization: false,
            advertising: false,
            userData: false,
            adPersonalization: false,
            analytics: false,
        };
        setPreferences(necessaryOnly);
        saveConsent(necessaryOnly);
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const cookieCategories = [
        {
            id: 'functionality',
            title: 'Cookie-uri de funcționalitate (obligatorii)',
            disabled: true,
            checked: true,
            description: 'Sunt esențiale pentru navigarea de bază și funcționarea tehnică a site-ului (de exemplu: reținerea opțiunilor de confidențialitate, securizarea formularelor și încărcarea rapidă a resurselor). Nu pot fi dezactivate.',
        },
        {
            id: 'personalization',
            title: 'Cookie-uri de personalizare și hărți interactive',
            disabled: false,
            checked: preferences.personalization,
            description: 'Permit site-ului să își amintească alegerile anterioare și să încarce elemente interactive terțe, cum ar fi harta Google Maps din pagina de contact. Fără aceste cookie-uri, harta interactivă va fi dezactivată.',
        },
        {
            id: 'security',
            title: 'Cookie-uri de securitate',
            disabled: false,
            checked: preferences.security,
            description: 'Sunt utilizate pentru autentificarea utilizatorilor, prevenirea utilizării frauduloase a datelor de trimitere și protejarea site-ului împotriva atacurilor cibernetice sau a spam-ului.',
        },
        {
            id: 'advertising',
            title: 'Cookie-uri publicitare',
            disabled: false,
            checked: preferences.advertising,
            description: 'Sunt folosite pentru a livra anunțuri relevante intereselor dumneavoastră și pentru a limita numărul de afisări ale aceleiași reclame pe parcursul navigării.',
        },
        {
            id: 'userData',
            title: 'Ad user data',
            disabled: false,
            checked: preferences.userData,
            description: 'Permit transmiterea datelor colectate despre utilizatori către rețelele partenere de publicitate (ex. Google, Meta) în scopul analizei de conversie și al profilării publicitare.',
        },
        {
            id: 'adPersonalization',
            title: 'Ad personalization',
            disabled: false,
            checked: preferences.adPersonalization,
            description: 'Ajustează și personalizează reclamele afișate pe alte platforme terțe pe baza istoricului dumneavoastră de navigare și a paginilor vizitate pe site-ul nostru.',
        },
        {
            id: 'analytics',
            title: 'Cookie-uri de analiză',
            disabled: false,
            checked: preferences.analytics,
            description: 'Ne ajută că colectăm date statistice anonimizate privind traficul (ex. numărul de vizitatori, cele mai accesate pagini și durata sesiunilor) pentru a optimiza structura site-ului.',
        },
    ]

    if (!isVisible) return null;

    return (
        <div className="cookie-overlay">
            <div className="cookie-popup">
                {showFullPolicy ? (
                    <div className="cookie-policy-wrapper">
                        <button
                            className="btn btn-outline back-btn"
                            onClick={() => setShowFullPolicy(false)}>
                            Înapoi la setări
                        </button>
                        <CookiePolicy />
                    </div>
                ) : !showPreferences ? (
                    <div className="cookie-main-view">
                        <h2 className="cookie-title">Folosim cookie-uri!</h2>
                        <p className="cookie-description">
                            Acest site web utilizează cookie-uri esențiale pentru a asigura funcționarea corectă a acestuia și cookie-uri de urmărire pentru a înțelege modul în care interacționați cu acesta. Acestea din urmă vor fi setate numai după obținerea consimțământului dumneavoastră.
                        </p>
                        <div className="cookie-actions">
                            <button
                                type="button"
                                className="btn btn-secondary" 
                                onClick={() => setShowPreferences(true)}>
                                Personalizați
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={handleAcceptNecessary}>
                                Doar cele necesare
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary" 
                                onClick={handleAcceptAll}>
                                Sunt de acord
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cookie-preferences-view">
                        <h2 id="cookie-title">Setări cookie</h2>
                        <h3 id="cookie-subtitle">Utilizarea cookie-urilor</h3>
                        <p id="cookie-description">Utilizăm cookie-uri pentru a asigura funcționalitățile de bază ale site-ului web și pentru a îmbunătăți experiența dumneavoastră online. Puteți alege pentru fiecare categorie să optați pentru opt-in/out oricând doriți.</p>

                        <div className="cookie-options">
                            {cookieCategories.map((item) => (
                                <div key={item.id} className="cookie-accordion-item">
                                    <div className="cookie-option-header">
                                        <button
                                            type="button"
                                            className="dropdown-trigger"
                                            onClick={() => toggleDropdown(item.id)}
                                            aria-expanded={!!openDropdowns[item.id]}
                                        >
                                            <span className={`arrow ${openDropdowns[item.id] ? 'open' : ''}`}>
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADOElEQVR4nO2WS08aURxH2Tdpamx4JDqIIOjwUD9JXUzY8D267K4ktY0prc+pm6Kioigi1NbaZXcujFFrsIIV5gnYD3Bv828uFqLWgSuCtcmc5BdJSJhzwsxFg0FHR0dHR0dHR+daLFPZITOfzZOR14Y7whoWhqwzQt46k893hIXGrmvmTzgLn0UW/gTKm8piC38SMLQY20yOs87mUdesANYZAazhHGbCp4Hbyd9RhC0icl1zAuqaE6C8RiI05VscYYuInC0iINu8CLaICA1FkPu8pnx1WWTif/ibJW9flPzd8yLqXhChmwRoR6DO98ITzQ8qP6x15ZsbYV+U/PZFEdkXJbAvSFAvggnnTrUDprI5+oDy7YRMfKbhCPuS5HdEJeSISkBGE8GEhdMm3EJl+coainAS+SUJ9SzJQEYT8ed00r6FqB7iy/JgJpvM3OjBdsUUrmdZRs6YDD3L5wF1I+YEzMwJTTiJrspXNnGMLRPHdS/giiucc0VGrhUFnDEyioiIgG0LlPI1I7TkJzPnmzjGxhoRbFzhXKsK6l1VwEW2QhExL95c/tqIevKTGTCNfwfTaBobQ+m/LsiuK1xvXEF9cRV6yagixMblL0VMZRGV/NgRmN6mwfj6G24f2QtclO9bUxGbUKFvTQW6CAk7oreUr0ZMHJcjqORDh/B4ZA/aX+zgR8HtAJFnEypi1wvAJshoIiTsiMrN/bUnEeZKRD354R1oC26DKbT7y50qYHeyAG4SQBUhY1esyfKXIiYziEbeHNoFT6oAnlSxPLoIuXXyVyNqyr/ZBe+HIng3iuW/dBFK6+WrEaNpzjR2hLTkfRtF8H0sgW+jRBmhYDZeuBv5akQozRlDh+iivIXIfypBPxkJoIpQMbt+x/IVHo/s+tuHd1BFvn+zBAObZ9BPRhHBJlTUt6Y27d/yhmh7vu1/+Owr8iZVGPx8BgNkFBHuZAF5kv9YvsKDp1/8vqQCg1s/qSI8KRU8ydL9kK9g5fdeDm6d1Y0g30Dnu4Nhw32EmT58VSuCnE4d/MG44T7DaESQ04m57/JaEeR0+m/kKzDT+0FvSsaepIwZfj9YfUNHR0dHR0fHUOU3xOaHEiPfgNAAAAAASUVORK5CYII=" alt="expand-arrow"></img>
                                            </span>
                                            <span className="option-title">{item.title}</span>
                                        </button>

                                        <label className={`switch ${item.disabled ? 'disabled' : ''}`}>
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                disabled={item.disabled}
                                                onChange={() => handleToggle(item.id)}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>

                                    {openDropdowns[item.id] && (
                                        <div className="cookie-dropdown-content">
                                            <p>{item.description}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="cookie-more-info">
                            <button
                                type="button"
                                className="link-btn"
                                onClick={() => setShowFullPolicy(true)}
                            >
                                Politica de cookies
                            </button>
                        </div>

                        <div className="cookie-actions-preferences">
                            <button className="btn btn-secondary" onClick={handleAcceptNecessary}>
                                Acceptă cookie-urile necesare
                            </button>
                            <button className="btn btn-outline" onClick={handleSavePreferences}>
                                Salvați setările
                            </button>
                            <button className="btn btn-primary" onClick={handleAcceptAll}>
                                Acceptă tot
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}

export default CookieBanner;