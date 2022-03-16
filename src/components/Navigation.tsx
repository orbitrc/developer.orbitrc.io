import React from 'react'

import './Navigation.scss'

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
  return (
    <nav
      className="od-navigation"
    >
      <h2
        className="od-navigation__title"
      >{props.title}</h2>
      <ul>
        {props.items.map(item => {
          return (
            <li>
              <a href={item.to}>
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Navigation.defaultProps = {
  children: [],
  title: 'Title',
  items: [],
} as NavigationProps;

export default Navigation
