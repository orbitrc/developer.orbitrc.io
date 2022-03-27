import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'

import './Navigation.scss'

import { useScreen } from 'src/hooks'

export interface NavigationItem {
  label: string;
  to: string;
}

interface NavigationProps {
  children: React.ReactNode;
  title: string;
  items: NavigationItem[];
}

const Navigation = (props: NavigationProps) => {
  const screen = useScreen();

  // For tablet, mobile.
  const [collapsed, setCollapsed] = useState(true);

  const list = (
    <ul
      className={`od-navigation__list ${collapsed ? 'od-navigation__list--collapsed' : ''}`}
      style={{
        height: screen.name === 'pc'
          ? 'initial'
          : (collapsed) ? 0 : screen.height - 64 - 24,
      }}
    >
      {props.items.map(item => (
        <li
          className="od-navigation__list-item"
        >
          <Link
            className="od-navigation__link"
            to={item.to}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Initial screen.name always 'mobile'. Modify className after rendering.
  useEffect(() => {
    const odNavigation = document.querySelector('.od-navigation');
    if (odNavigation) {
      odNavigation.classList.remove('od-navigation--mobile');
      odNavigation.classList.remove('od-navigation--tablet');
      odNavigation.classList.remove('od-navigation--pc');

      odNavigation.classList.add(`od-navigation--${screen.name}`);
    }
  }, []);

  return (
    <nav
      className={`od-navigation od-navigation--${screen.name}`}
    >
      {screen.name !== 'pc'
      ?
        <>
          <div
            className="od-navigation__toggle"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            ⇩
            <h2
              className="od-navigation__title"
            >{props.title}</h2>
          </div>
          {list}
        </>
      :
        <>
          <h2
            className="od-navigation__title"
          >{props.title}</h2>
          {list}
        </>
      }

    </nav>
  );
}

Navigation.defaultProps = {
  children: [],
  title: 'Title',
  items: [],
} as NavigationProps;

export default Navigation
