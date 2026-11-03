
import React from "react";
import { cities } from "../data/products";

function Footer() {
  return (
    <footer className="footer" id="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <div className="logo">
            <span className="logo-icon">S</span>
            Swiggy
          </div>

          <p>Order food, groceries, and more with Swiggy.</p>

          <div className="social-links">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="#footer">About Us</a>
          <a href="#footer">Careers</a>
          <a href="#footer">Team</a>
          <a href="#footer">Swiggy One</a>
        </div>

        <div className="footer-column">
          <h3>Contact Us</h3>
          <a href="#footer">Help & Support</a>
          <a href="#footer">Partner With Us</a>
          <a href="#footer">Ride With Us</a>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>
          <a href="#footer">Terms & Conditions</a>
          <a href="#footer">Privacy Policy</a>
          <a href="#footer">Cookie Policy</a>
        </div>

        <div className="footer-column">
          <h3>Available In</h3>
          {cities.slice(0, 5).map((city) => (
            <a href="#restaurants" key={city}>
              {city}
            </a>
          ))}
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Swiggy Clone. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
