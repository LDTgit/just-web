import React, { useEffect, useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { HashLink } from 'react-router-hash-link';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollState = useRef();
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {

    const handleOutsideInteraction = (event) => {
      // Close when clicking outside the nav
      const isClickInsideNav = navRef.current && navRef.current.contains(event.target);
      const isClickInsideBurger = burgerRef.current && burgerRef.current.contains(event.target);
      if (isOpen && !isClickInsideNav && !isClickInsideBurger) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideInteraction);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      ref={scrollState}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#132847"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto" className="header-container">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
          w="full"
          className="header-content"
        >
          <nav>
            <section>
              <HashLink smooth to="/#home">
                <img src={require('../../assets/images/just_law_logo.svg').default} alt='SCA Logo' className="logo" />
              </HashLink>
            </section>
          </nav>

          {/* Buton Burger pentru mobil */}
          <button
            ref={burgerRef}
            className={`burger-btn ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigatia cu clasa dinamica */}
          <nav
            ref={navRef}
            className={`nav-links ${isOpen ? 'open' : ''}`}>
            <HStack spacing={8}>
              <HashLink smooth to="/#services" >Servicii</HashLink>
              <HashLink smooth to="/#team">Echipa</HashLink>
              <HashLink smooth to="/#contact">Contact</HashLink>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
