import React from "react";
import './HeroSection.css';
import ladyJusticeWebp from '../../assets/images/justice.webp'

const HeroSection = () => {

    return (
        <div className="container-hero">
            <div className="container-image">
                <img src={ladyJusticeWebp} alt="lady-justice" fetchpriority="high"/>
            </div>
            <div className="container-text">
                <h1 className="hero-title">LAW FIRM</h1>
                <p className="hero-subtitle">Your Trusted Legal Partner</p>
            </div>
        </div>
    )
}

export default HeroSection;