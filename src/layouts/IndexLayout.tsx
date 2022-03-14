import React from 'react'

import './IndexLayout.scss'

import HeaderBar from '../components/HeaderBar'

interface IndexLayoutProps {
  children: React.ReactNode;
  className: string;
}

const IndexLayout = (props: IndexLayoutProps) => {
  return (
    <div
      className={`od-index-layout ${props.className}`}
    >
      <HeaderBar />
      <main
        className="od-index-layout__main"
      >
        {props.children}
      </main>
    </div>
  );
}

IndexLayout.defaultProps = {
  children: [],
  className: '',
} as IndexLayoutProps;

export default IndexLayout
