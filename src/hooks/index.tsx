import { useEffect, useState } from 'react'

const breakpoints = {
  mobile: 428,  // from 0 to 428.
  tablet: 810,  // from 429 to 810.
  pc: 1024,     // from 811 to Infinity.
};

function getScreenName(): string {
  const width = (typeof window !== 'undefined') ? window.innerWidth : 0;
  if (width <= breakpoints.mobile) {
    return 'mobile';
  } else if (width <= breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'pc';
  }
}

interface Screen {
  width: number;
  height: number;
  name: string;
}

function useScreen(): Screen {
  const innerWidth = (typeof window !== 'undefined') ? window.innerWidth : 0;
  const innerHeight = (typeof window !== 'undefined') ? window.innerHeight : 0;

  const [width, setWidth] = useState(innerWidth);
  const [height, setHeight] = useState(innerHeight);
  const [name, setName] = useState(getScreenName());

  function windowResizeHandler() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    setName(getScreenName());
  }

  useEffect(() => {
    windowResizeHandler();

    window.addEventListener('resize', windowResizeHandler);

    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    }
  }, []);

  return {
    width,
    height,
    name,
  };
}

interface ColorScheme {
  setConfig: (value: string) => void;
  current: string;
}

function useColorScheme(): ColorScheme {
  const [_, setConfig] = useState('auto');
  const [current, setCurrent] = useState('initial');

  function setConfigFunction(value: string) {
    setConfig(value);
    switch (value) {
      case 'auto':
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setCurrent('dark');
        } else {
          setCurrent('light');
        }
        localStorage.setItem('color-scheme', 'auto');
        break;
      case 'light':
        setCurrent('light');
        localStorage.setItem('color-scheme', 'light');
        break;
      case 'dark':
        setCurrent('dark');
        localStorage.setItem('color-scheme', 'dark');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const userConfig = localStorage.getItem('color-scheme');
    if (!userConfig) {
      localStorage.setItem('color-scheme', 'auto');
    } else {
      setConfig(userConfig);
    }
  }, []);

  return {
    setConfig: setConfigFunction,
    current: current,
  }
}

export {
  useScreen,
  useColorScheme,
}
