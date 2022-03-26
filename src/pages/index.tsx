import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"

import './Index.scss'

import IndexLayout from '../layouts/IndexLayout'
import Card from 'src/components/Card'
import Seo from "../components/seo"

import { useScreen } from 'src/hooks'

const IndexPage = () => {
  const screen = useScreen();
  const [cardCol, setCardCol] = useState(6);

  useEffect(() => {
    if (screen.name === 'mobile') {
      setCardCol(12);
    } else {
      setCardCol(6);
    }
  }, [screen.name]);

  return (
    <IndexLayout
      className="index"
    >
      <Seo title="Home" />
      <div
        className="index__header"
        style={{
          backgroundColor: 'rgb(76, 76, 76)',
          color: '#ffffff',
        }}
      >
        <h1>Make Things Better<span>▌</span></h1>
        <p>References, documentation for Linux developers.</p>
      </div>
      <div
        className="index__cards-wrapper"
      >
        <div
          className="index__cards row"
        >
          <div
            className={`col-${cardCol}`}
          >
            <Card
              title="Wayland Client Programming Guide"
              description="Learn how to make a Wayland client on Linux"
              to="/documentation/wayland/guides/introduction"
              image="https://upload.wikimedia.org/wikipedia/commons/9/99/Wayland_Logo.svg"
              backgroundColor="#8b4513"
            />
          </div>
          <div
            className={`col-${cardCol}`}
          >
            <Card
              title="Title Here"
              description="Description here"
              to=""
              image=""
              backgroundColor="#3d3d3d"
            />
          </div>
        </div>
      </div>
      <p>
        <Link to="/documentation/wayland/guides/introduction">
          Wayland client development guide
        </Link>
        <br />
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link> <br />
        <Link to="/using-ssr">Go to "Using SSR"</Link> <br />
        <Link to="/using-dsg">Go to "Using DSG"</Link>
      </p>
    </IndexLayout>
  );
}

export default IndexPage
