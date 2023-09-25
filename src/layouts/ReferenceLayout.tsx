import React from 'react'

import './ReferenceLayout.scss'

import HeaderBar from 'src/components/HeaderBar'
import Navigation, { NavigationItem } from 'src/components/Navigation'
import Footer from 'src/components/Footer'
import { useScreen } from 'src/hooks'

interface ReferenceLayoutProps {
  children: React.ReactNode;
  className: string;
}

const ReferenceLayout = (props: ReferenceLayoutProps) => {
  const screen = useScreen();

  return (
    <div
      className={`od-reference-layout od-reference-layout--${screen.name} ${props.className}`}
    >
      <HeaderBar />
      <div
        className="od-reference-layout__wrapper"
      >
        <Navigation
          title="reference"
          items={[] as NavigationItem[]}
        />
        <main
          className="od-reference-layout__main"
        >
          {props.children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

ReferenceLayout.defaultProps = {
  children: [],
  className: '',
  // navigationItems: [],
} as ReferenceLayoutProps;

export default ReferenceLayout
