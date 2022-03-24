import React, { useEffect } from 'react'

import './Footer.scss'

import { useColorScheme } from 'src/hooks'

const Footer = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (colorScheme.current === 'initial') {
      return;
    }
    console.log(colorScheme.current);
    document.body.classList.remove('body--light');
    document.body.classList.remove('body--dark');
    document.body.classList.add(`body--${colorScheme.current}`);
  }, [colorScheme.current]);

  return (
    <footer
      className="od-footer"
    >
      <div
        className="od-footer__color-selector"
      >
        <input
          id="light-button"
          type="radio"
          name="color-scheme"
          value="light"
          onClick={() => {
            colorScheme.setConfig('light');
          }}
        />
        <label htmlFor="light-button">Light</label>
        <input
          id="dark-button"
          type="radio"
          name="color-scheme"
          value="dark"
          onClick={() => {
            colorScheme.setConfig('dark');
          }}
        />
        <label htmlFor="dark-button">Dark</label>
        <input
          id="auto-button"
          type="radio"
          name="color-scheme"
          value="auto"
          onClick={() => {
            colorScheme.setConfig('auto');
          }}
        />
        <label htmlFor="auto-button">Auto</label>
      </div>
      <div
        className="od-footer__copyright"
      >
        Copyright &copy; 2022 Orbit Research Centre. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
