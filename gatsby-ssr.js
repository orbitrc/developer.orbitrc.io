/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react');

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script src="/pre-body.js" key={0} />
  ]);
}
