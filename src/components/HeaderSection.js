import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) {
      header.classList.toggle('open', isMenuOpen);
    }
  }, [isMenuOpen]);

  return (
    <header>
      <div className="head-div">
        <div className="head-title">
          <a href="/">
            <h1>Once</h1>
            <p>Finance</p>
          </a>
        </div>

        <div id="menuIcon" onClick={toggleMenu}>
          <i className={`fa-solid ${isMenuOpen ? 'fa-x' : 'fa-bars'}`}></i>
        </div>

        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/invite">Invite</a></li>
            <li className="active"><a href="/trade">Trade</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;