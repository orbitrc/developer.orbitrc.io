import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import IndexLayout from '../layouts/IndexLayout'
import Seo from "../components/seo"

const IndexPage = () => (
  <IndexLayout>
    <Seo title="Home" />
    <h1>Developer's Heaven</h1>
    <p>Welcome to Orbit Developer.</p>
    <StaticImage
      src="../images/orbit-logo-developer.png"
      width={192}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="Orbit Developer Logo"
      style={{ marginBottom: `1.45rem` }}
    />
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
)

export default IndexPage
