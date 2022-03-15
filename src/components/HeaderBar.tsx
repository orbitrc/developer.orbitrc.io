import React from 'react'

import './HeaderBar.scss'

const HeaderBar = () => {
  return (
    <header
      className="od-header-bar"
    >
      <a
        className="od-header-bar__link row items-center"
        href="/"
      >
        <img
          className="od-header-bar__link__logo"
          src="https://raw.githubusercontent.com/orbitrc/developer.orbitrc.io/main/static/orbit-logo-dev%40512x512.png"
          width="48"
        />
        Orbit Developer
      </a>
    </header>
  );
}

export default HeaderBar
