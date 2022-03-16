import React from 'react'

import './GuideLayout.scss'

import HeaderBar from 'src/components/HeaderBar'
import Navigation, { NavigationItem } from 'src/components/Navigation'

interface GuideLayoutProps {
  children: React.ReactNode;
  className: string;
  navigationItems: NavigationItem[];
}

const GuideLayout = (props: GuideLayoutProps) => {
  return (
    <div
      className={`od-guide-layout ${props.className}`}
    >
      <HeaderBar />
      <div
        className="od-guide-layout__wrapper"
      >
        <Navigation
          title="guide"
          items={props.navigationItems}
        />
        <main
          className="od-guide-layout__main"
        >
          {props.children}
        </main>
      </div>
    </div>
  );
}

GuideLayout.defaultProps = {
  children: [],
  className: '',
  navigationItems: [],
} as GuideLayoutProps;

export default GuideLayout
