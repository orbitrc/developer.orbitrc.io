import React from 'react'

import './IndexLayout.scss'

import HeaderBar from '../components/HeaderBar'
import Footer from 'src/components/Footer'

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
      <Footer />
    </div>
  );
}

IndexLayout.defaultProps = {
  children: [],
  className: '',
} as IndexLayoutProps;

export default IndexLayout
