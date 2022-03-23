import React, { useEffect } from 'react'
import Helmet from 'react-helmet'

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
      <input
        type="radio"
        name="color-scheme"
        value="light"
        onClick={() => {
          colorScheme.setConfig('light');
        }}
      />
      <input
        type="radio"
        name="color-scheme"
        value="dark"
        onClick={() => {
          colorScheme.setConfig('dark');
        }}
      />
      <input
        type="radio"
        name="color-scheme"
        value="auto"
        onClick={() => {
          colorScheme.setConfig('auto');
        }}
      />
    </footer>
  );
}

export default Footer
