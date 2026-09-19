import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMap } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { HStack } from "@chakra-ui/react";

import { Link } from 'react-router-dom';

const socials = [
  {
    icon: faPhone,
    url: "tel: ",
    label: "Telefon",
  },
  {
    icon: faFacebook,
    url: "https://facebook.com",
    label: 'Facebook',
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com",
    label: 'Linkedin',
  },
  {
    icon: faMap,
    url: "https://maps.app.goo.gl/tQpxJtzFp9f6aZT97",
    label: 'Google Maps',
  },

];

const navItems = socials.map((item, index) => {
  return <a key={index} href={item.url} aria-label={item.label}><FontAwesomeIcon icon={item.icon} size="2x" /></a>
})

function Footer() {
  return (
    <footer>
      <div id='footer-first-section'>
        <section id="footer-logo">
          <img src={require('../../assets/images/just_law_logo.svg').default} alt='SCA Logo' className="logo" />
        </section>

        <section id="footer-socials">
          <HStack spacing={4}>
            {navItems}
          </HStack>
        </section>
      </div>

      <section id='footer-legal-links'>
        <div className='legal-nav'>
          <Link to='/privacy-policy'>Politică Confidențialitate</Link>
          <Link to='/cookie-policy'>Politică Cookie-uri</Link>
        </div>
      </section>
    </footer>
  );
}

export default Footer;