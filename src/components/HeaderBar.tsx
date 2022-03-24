import React, { useEffect, useState } from 'react'

import './HeaderBar.scss'

const HeaderBar = () => {
  const [style, setStyle] = useState({
    backgroundColor: 'rgba(243, 243, 243, 1.0)',
  });

  function scrollHandler() {
    let alpha = 1.0 - window.scrollY / 1000;
    if (alpha < 0.7) {
      alpha = 0.7;
    }
    const backgroundColor = `rgba(243, 243, 243, ${alpha})`;
    setStyle({
      backgroundColor,
    });
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return (
    <header
      className="od-header-bar"
      style={style}
    >
      <a
        className="od-header-bar__link row items-center"
        href="/"
      >
        <img
          className="od-header-bar__logo"
          src="https://raw.githubusercontent.com/orbitrc/developer.orbitrc.io/main/static/orbit-logo-dev%40512x512.png"
          width="48"
        />
        Orbit Developer
      </a>
    </header>
  );
}

export default HeaderBar
