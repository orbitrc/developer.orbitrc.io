const fs = require('fs');

const markdownPages = [
  {
    path: '/documentation/wayland/guides/introduction',
  },
];

exports.createPages = async ({ actions }) => {
  const { createPage, createRedirect } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });

  markdownPages.forEach(page => {
    const md = fs.readFileSync(`./src/markdowns${page.path}.md`, 'utf8');

    createPage({
      path: page.path,
      component: require.resolve('./src/templates/guide.tsx'),
      context: {
        markdown: md,
      },
    });
  });

  // /documentation/wayland/guides/
  createRedirect({
    fromPath: '/documentation/wayland/guides',
    toPath: '/documentation/wayland/guides/introduction',
  });
}
