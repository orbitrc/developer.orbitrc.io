import React from 'react'

import './GuideLayout.scss'

import HeaderBar from 'src/components/HeaderBar'

interface GuideLayoutProps {
  children: React.ReactNode;
  className: string;
}

const GuideLayout = (props: GuideLayoutProps) => {
  return (
    <div
      className={`od-guide-layout ${props.className}`}
    >
      <HeaderBar />
      <main
        className="od-guide-layout__main"
      >
        {props.children}
      </main>
    </div>
  );
}

GuideLayout.defaultProps = {
  children: [],
  className: '',
} as GuideLayoutProps;

export default GuideLayout
