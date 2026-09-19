import React, { useEffect, useState } from 'react';
import './MapSection.css';
import { getCookie, setCookie } from '../utils/cookieUtils';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// const telIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAPRElEQVR4nO1dCVBURxqevWprd2vv3dq79qhsZY1IJF4IEg2CEQSHI4goIKAiaiQYlQSMoqJ4gEQgQVA8CR4YglEJBg8CwnuoxNsYDASB6TfA9BvEA0WOf6sbQYYZZpiLN+j7qv4aB+G96f97f//d/9EjkYgQIUKECBEiRIgQIUKECBEiRIgQIUKECFV8Abd/Woa5VxglN5HBMicqPLIva5L/OxvgR31+XYSpAQA/LFXIJrM89yGL0TUWozaW50CTMDz3kMUcw/JozXlePlzoz/5c4Ypc/guGl69gMbrTHwHahMGok+W502UKJCWkCj2eIQsA+EEploWwGDUaQoRmcrir5xXcaKHHNuRQ3tj4F/JUm4oIFSFTHeY2M7W1PxN6nEMCLJaPY3hUbxYyVP1MeYmi5q9Cj9eiUYbRFIZHD8xNRi9rucM2yf8l9LgtEmVK5EBXR4NFxjOnX32+oeHPQo/fosA2yf/FYA4PFgmPO9pBA6qE1oNFoBzgJwyPLg62ZWjwKduE1oVFgMXcKm2KKqmvhSL0vSksQA2POtpVfr+9owNJXmSUKrl/sjz3SJtyN2xaD2tjYwbJn3BXXuiwC8ujfdoUdE5eDZ524+DTkrNG+Yp7ba097/taxQBQKXkRcIGX/UNbPIpI6v5dEOwpVfs5mcLWb4wlKyRzWMlVyYsIBnMbdSknxMsD0g/uVyMjdLYvfLDyPYOV3m0d3dbSV8pwva3kuYtD8XIrlpf5lirki1mee5dRotnkZ+T/iLCYq9GluP0ncqGkobbnfTFXDWH+syDqvWXAKGRm9CXoY8nzgDJc93cGowSGR/J+B4xpsPCUvkoaLDKeTlu1kqGM4nvcHwkRLM+16Dv4s9UVEJ+UAMsj3obYuLVw9EKJ2u8QKyHT1MroSLP4DU1SqkD/kwxFlCqQB4M5hSGDPvxVAXhPsAXpGBtYFuAKMyaMAZcRVrB5W7zaais1c7fJyci7Xg4b4+MgbNYMCJo+DZYtCoWMnEP0PmUKLkAy1MAquUUMRh2GKCOXLQbp2NEQ6GwHqGInQMtn8Fh5GBKjA+DN4cNgY8ImndcouH2dWteB03l63z8tcw/4OzvCgbQkuHaxCG5cOge5+3dCkOsUCJ8bCKduX0+RDCUwPIo09Mk8W10BMyZNoGTUV+6Czgc58Ig/REnpfJgDyavmaCWFEBCxMBSm2Yykr8culel1f7JYWOAtBaXie+hob1KRRw/rIWZJGCz096uXDBWwPOdqqGWwPAfrNqwBN5sRUHMjjZLw7cVkmONsT8kZCCmLgwJgS1ICtRB9701CMX6OE0FWfUONjG55eF8OsxwndialpYRKR42c52U75ltX6+Ft7jbWD33sbE87Wb1sOVnHc3drfmtMZPac/A54jB0NqeuCqfK7Je+TKIgJ8+p5PxBLMUQOnTkJ7wb790tGt+xLSQBPe1tY4ufT+XVJAbQ8qIfmpjoozDsCfpMcmj1tR82TWAJIVNQYhWQcOQBTrV6BmpvpKoR0S0PVbuBr96mRkpyx3aD7lTbW0R1/9PIIiI5cBu+vWAopG9fqJKTy1kVIWBkJrY8Vav/XpKgGv4kOzW8OGyZsRUv5PfQHFnOPjSEkfH4wLPZ20kgGkZK8WLXpK26pL7iPGglFdZV6T09LQgJhe8IGuMyehoLcAzDb6Q1Ijl2lkxBdcuZ4dufMiRM+FZQQWo5jBBlf1X4HriNHwP5ti/slhMjJg9EQ4DQeuO8y6Pvq66nUSo4Un9brfskZqXBwV6qKIsm0gxuq6L/JyupgejLcusboTUizshZ87G3lghLC8uiCMYTsOZpNFUucuDZC+pJyqTCe/t3Jm5d13oNsLMnUNN/bA3wc7KjiNCm0pOAoXC47Y5B1VN++Akczd8LMifbtLiOGr5n60ks/HXQyzjfLfm/MyorlOVgZtQJ8Xx9Ll7m6CCGSfzAaZjvaQtDUCRARFqLz+vHbEmCRrzcUf5lLV1G1VddUFNn+hIfvKy4Brq+CvMN7DSKDOXMcmNPHob1NCQp5FcRHLW/xsh13w2nUf349KCSwPLeMwdw5lkf3jCGD5TmY6fg6bI2aPSAyiDRzmTBrki142Y2DM1W3tF57x8FMiIlYBG1PsEZFkv1F7v4dcK28CHYlxhlsHScO7VH72ZHdqW0zHOyOm42IcoR+zvLcBl3ZPH1lob8fhM9wHhAZd7lMWCCdDHOmu+okg8hcr+kap6fSU8fg808yYH9KAt1fGOvMNQmxvEBnx2bXYcP+aXIymIbal1iMrpuSiL4+5Hppoh5kfKPzuie/uQLRi0PVFHWxOB9uXdXfYRsiiavea5kybJiHyXPcDM/VmYMMtivPAMFSV4ieKzUZGUTyrpVD1MJ5akr6Ku/TQSGDyEfrV7VOtRrmbzIyCgF+3FXCbx4y2B4rOUKt5EpxgtHTVA/RChnM95b26z/MLU9aMQQ4TbrvMuLlESYj5GlmT22wvQsDTGYlXu7Ul5BNX29CFns706CjPmR0S8KH8ZCVniQIIfuS4zveGj/2osnIIH0TJEtmbutgn8q+E59RKyk+HqtCSMbmBeBiPVzv6G13Eis8OBASV79P9wmGWMvjlgaQ3bkxYCFh+7Xhi8DbblzDtFf/+zeTEcIq5JN6W0R/BWWmlLeD/SHExQGe3M3uIeRefRZ42b4G4aG69xz9xa2S0z+CEKkbTLOxpqQPRHJysqD2YSPszPgYZjtPHrCEzvCi+ZjPL55zlpgSDI/WDZZ1sE/lxJULNIySmfS2ipVkp0VQJR0o0D/pJJSUKrgxBiufFBUPpDpMV3GZKaxmw6ZYmhep/eZZ5Le16TAEONvDTCdHvYOJQgmjrDedMydgMSoSYiAl9bUQNN0V3vZ2grZ7n/aQcrkogYboSajF4snAqLMM418ZTUIvS6lkeFSmb5mlqfxKLlsMrq9aqUWAU1YHUVL2HsuxbEJ4rkJiajA8d1TIQcUnxYOr9XCVHXwLPkSDiqQQ4sSV8xZMCPrI5ISwPEocaJmlWQaFEUSEBtNIMK7Z20MKyYNIR78Kfs6OUFChf/68r5jDJ5mlq5fFnLfQT1phzXcw+01HeMd3ispSmMnfAC4jhkOAuyucqrxp0LW3Z+0Bbwc7unojr2kH9prqc9+SmAPEKQnR38dqSC5Jx74GcREzVHImJw+thKkjhsOsqc4DSlL1FlIgQYiIDHKDnIxlEDnHzaSFEwxGS8xCCovRdqEJYZ/WXJFNHXHqvZ18YW4MTBtpBV7242nliD5kJK2a0xOmIa9JqwJNRwpG7aRh1TyF0oPZksz3L7tzD9Npak9CmAop10oSwddhLA2vkM4qsmzWTUYgJYEsq1ubss1CCul5N8uxHQzmAoUmg30qpHSHTFPpcfNVgpDE6UfNlVJlzvFw01ic3ZeMbl8UJn2DRpTNQopS5i4RoglzMGVHdhYNr5B6344HzzaORJl5We/TIm1iLWQDeeq7G/2S0S2Z2xbDh9EBKtd5RspGYz/vLrMQ0kWKPIjhUbMplHrsaxY2blwHEfOC4IPId/Xe6GWePAbTR9vA6gWe8EBxQLWo7vs9sGmZH91ATh/dFZTsj4zeUncrHe43ZKmRkn4w03J7SmgPIM+lsDy6b+iH3HlwHy1q/vKzLBqqJq/zpNMgMmIJMIq6AV+HNH36TJwAIS4TNVY8VpSnwMpQD0qMLjKIHNsXSacvUkRBSXmQA0tnuUCwp7vhDx9GbYNy/BM5uY2G55XcQgajaAZzS7tetZcEfX6xFCICZtJqj945h9ZHjaRelhZLk2kmcXsyxMREwdaPPoQvv73a7/XIHiTM3xc8xtrAmZwYjYombQ26yOiWw9sjYL7b66Cs20/fH9nxLrjZvGpUDwpzt/Z3EqGgq+A6dnUULd/UlAi6euErmD5mFMzzcIMje9Pg7PFs2L55HS330TalkXzHutjV1BLiInx7ph1DpTcpiVH+4O/ibNT0XKJQ/FIwQsguVeXpUNTB1uQEmhwi3UhvTRgP9+/KNBLS9gRDatwauMvXqPycVIiQvyuouKZ14FlfnqA1Xn6TbNWyjoaQEjh5PI2l9e3c0s+HoCekmVU4QjDK7/2BtmzeACsXBEMDqqDpzbgV76hNVx0DkDXvLIQtSVsHVCcctWIptZYPQj1BdmuHQYSQvY3rSCsIcJuql19TI4RHNyVCguHR+sI7t2HL1k0QHjIHPMeNAYW80uiCgbRN62D+zLcGHLciu/ZAdxf6hBOH3js4qU2a5Z/A3q0LaYJs6aL5Ku3XBjr1NEEJ2ZmdtWCW0xvw8YbVcKHoJNy8XGIUEa2PGml14fHDe2FteBj4ONhDTmnhgJRBfMu2Hal0unMfZQ27ExbS/HxfEkjbXOkX62Hzcj9we80avOzH0UWFKdqsyRG1ghISMGVyJakAN1Upzc3LJdDI3e55T2pvA131m0ZILztZrXnb24J09EhIWz8Xbl9Kod1ZZFlMSCC7/0Vz/GjEV99ThrRYR5GgZLi+8sqfvW3HtpGaVnPWOy3wmg65Zef0VlCRrIr6IZ/Xu0LupNnnndAQSNmdrnVpbaC0mDynri+cXn75r74Odm3mJKOjvQkW+XpB1inDq0+IXyCbyhJ5jalJeHYmMJYHSSwBPhPG4yvnC81GRtW3X5MCNLqaMocyTUBGB4tRuMRS4DFmjJvX+HEtRfmfwb27dSYj4kEzoi0EpBew70lAliIkbsXw3FSJpWGK1f+cPUa/dnnaSOtObZWBLtZWcOJMPgS6vAn5Z/O7Annbk+DOA0XP+24hyan5Pp5GTVXGCVrDYC6dxaiyDwmtLOZKyOkV5PhziSWj6ygm/Q+eYS1MGJ5L6ttBduFu/X8YXPs3clinZCiBxbJgYZSITHIKNoO54iGndF0gT9ggP9EVbH39n8p4brkxDakMj84KGhg0F0hwjcEodVAIweg6mUpUzl/RdnCa5mu0sRhtee4sQ50ULsbYFmpWuyLzyZkrfe9drlT+mjarYk6pfXpCT1jMHSC+T/KioEwpn2aGbzl4xPLoPV2ZOZpU4zmXrhUTymR5lE1e6cGbmPMubKr+jeRFBHmKSb0XfSJ5I3wFRp20/rix7r9Cj+m5APmiLoY4fMzxejptUk25q7RJZiP0GJ5LfEGmEoyc6Tfc8FwB+aqI7hLWro0XusPwqJCebKqUuYvfgiNChAgRIkSIECFChAgRIkSIECFChAgRIkSIECEZUvg/aly0y87pMxwAAAAASUVORK5CYII=";
// const whatsappIcon = "data:image/png;base64,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";
// const mapIcon = "data:image/png;base64,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";
// const mailIcon = "data:image/png;base64,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";

const MapSection = () => {
    // Adresa sediului
    const address = 'București, Romania';

    // Stare pentru consimtamantul cookie-urilor functionale
    const [hasFunctionalConsent, setHasFunctionalConsent] = useState(false);

    // Functie de verificare consimtamant din localStorage
    const checkConsent = () => {
        //Verificam intai cheia individuala
        const directConsent = getCookie('cookie_functional_consent');
        if (directConsent === 'true'){
            setHasFunctionalConsent(true);
            return;
        }

        // Verificam obiectul general salvat de Cookiebanner
        const fullConsent = getCookie('cookie_consent');
        if (fullConsent){
            try {
                const parsed = JSON.parse(fullConsent);
                if (parsed.personalization){
                    setHasFunctionalConsent(true);
                    return;
                }
            } catch (e){
                console.error("Error parsing cookie_consent", e);
            }
        }
        setHasFunctionalConsent(false);
    }

    useEffect(()=>{
        // Verificare initiala la incarcarea paginii
        checkConsent();

        // Asculta evenimentul emis cand utilizatorul da click pe buton sau schimba din banner
        const handleConsentUpdate = () => {
            checkConsent();
        };

        window.addEventListener('cookie_consent_updated', handleConsentUpdate);
        return () => {
            window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
        };
        
    }, []);

    // Functie apelata cand utilizatorul apasa pe butonul din placeholder
    const handleEnableFunctionalCookies =()=>{
        // Salvam in ambele locuri pentru sincronizare
        setCookie('cookie_functional_consent', 'true');
        const existingConsent = getCookie('cookie_consent');
        let currentPreferences = {functionality: true};

        if (existingConsent) {
            try {
                currentPreferences = JSON.parse(existingConsent)
            } catch (e) {}
        }

        currentPreferences.personalization = true;
        setCookie('cookie_consent', JSON.stringify(currentPreferences));

        // Actualizam starea locala
        setHasFunctionalConsent(true);

        // Notificam si restul aplicatiei: bannerul de cookie-uri pentru a bifa si acolo categoria
        window.dispatchEvent(new Event('cookie_consent_updated'));
    }

    return (
        <div className="map-card">
            <h3 className='map-card-title'>Date contact</h3>
            <div className='map-info'>
                <div className='info-container'>
                    <div className='info-item'>
                        <div>
                            <a href='tel:+40720000000'>
                                <span className='info-icon'>
                                    {/* <img src={telIcon} alt="TelIcon"></img> */}
                                    <FontAwesomeIcon icon={faPhone} size="2x" />
                                </span>
                                <span className='info-text'>+40 (720) 000 000</span>
                            </a>
                        </div>
                        <div>
                            <a aria-label="Chat on WhatsApp" href="https://wa.me/1XXXXXXXXXX">
                                {/* <img alt="Chat on WhatsApp" src={whatsappIcon} /> */}
                                <span className='info-icon'>
                                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                                </span>
                                <span className='info-text'>Caută-ne pe WhatsApp</span>
                            </a>
                        </div>
                        <div>
                            <a aria-label="Email" href="mailto:email@example.com">
                                {/* <img src={mailIcon} alt='apple-mail'></img> */}
                                <span className='info-icon'>
                                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                </span>
                                <span className='info-text'>email@example.com</span>
                            </a>
                        </div>
                    </div>

                    <div className='info-item'>
                        <span className='info-icon'>
                            {/* <img src={mapIcon} alt="MapIcon"></img> */}
                            <FontAwesomeIcon icon={faMap} size="2x" />
                        </span>
                        <div className='info-text'>
                            <strong>Adresă:</strong>
                            <p>{address}</p>
                        </div>
                    </div>

                </div>

                <div className='map-iframe-container'>
                    { hasFunctionalConsent ? (
                    <iframe
                        className='mapFrame'
                        width="100%"
                        height="450"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182321.82039803825!2d25.929486729333497!3d44.43770676401597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest!5e0!3m2!1sen!2sro!4v1789776523611!5m2!1sen!2sro"
                        allowFullScreen 
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map of Bucuresti">
                    </iframe>
                    ) : (
                        <div className='map-placeholder'>
                                <FontAwesomeIcon icon={faLock} size='3x' className='placeholder-icon' />
                                <p className='placeholder-text'>
                                    Pentru a vizualiza harta interactivă, vă rugăm să acceptați cookie-urile funcționale.
                                </p>
                                <button
                                className='enable-cookies-btn'
                                onClick={handleEnableFunctionalCookies}
                                >
                                    Acceptă Cookie-urile de personalizare și hărți interactive și încarcă harta.
                                </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MapSection;