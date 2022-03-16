const fs = require('fs');

const markdownPages = [
  {
    title: 'Introduction',
    path: '/documentation/wayland/guides/introduction',
  },
  {
    title: 'Getting Started',
    path: '/documentation/wayland/guides/getting-started',
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

  //=================
  // Wayland Guides
  //=================
  const waylandGuidesNavigationItems = [];
  markdownPages.forEach(page => {
    waylandGuidesNavigationItems.push({
      label: page.title,
      to: page.path,
    });
  });

  markdownPages.forEach(page => {
    const md = fs.readFileSync(`./src/markdowns${page.path}.md`, 'utf8');

    createPage({
      path: page.path,
      component: require.resolve('./src/templates/guide.tsx'),
      context: {
        markdown: md,
        navigationItems: waylandGuidesNavigationItems,
      },
    });
  });

  // /documentation/wayland/guides/
  createRedirect({
    fromPath: '/documentation/wayland/guides',
    toPath: '/documentation/wayland/guides/introduction',
  });
}
