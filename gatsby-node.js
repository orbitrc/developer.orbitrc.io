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
  {
    title: 'Hello, Wayland!',
    path: '/documentation/wayland/guides/hello-wayland',
  },
  {
    title: 'Everything is a Surface',
    path: '/documentation/wayland/guides/everything-is-a-surface',
  },
  {
    title: 'In Pixels We Trust',
    path: '/documentation/wayland/guides/in-pixels-we-trust',
  },
  {
    title: 'Cairo For an Image',
    path: '/documentation/wayland/guides/cairo-for-an-image',
  },
  {
    title: 'Pango For Text',
    path: '/documentation/wayland/guides/pango-for-text',
  },
];

//===================
// Reference Pages
//===================
const primerMarkdownPages = [];
const listdir = fs.readdirSync('./src/markdowns/documentation/primer/references/v0');
const markdowns = listdir.filter(filename => {
  return filename.endsWith('.md');
});
markdowns.forEach(md => {
  const title = '';
  const path = md === 'index.md'
    ? '/documentation/primer/references/v0/'
    : `/documentation/primer/references/v0/${md.replace('.md', '')}`
  primerMarkdownPages.push({
    title: title,
    path: path,
    index: md === 'index.md',
  });
});


exports.createPages = async ({ actions }) => {
  const { createPage, createRedirect } = actions

  // Boilerplates. Maybe not used.
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
        title: page.title,
      },
    });
  });

  //=====================
  // Primer References
  //=====================
  primerMarkdownPages.forEach(page => {
    const md = page.index === true
      ? fs.readFileSync(`./src/markdowns${page.path}/index.md`, 'utf8')
      : fs.readFileSync(`./src/markdowns${page.path}.md`, 'utf8');

    createPage({
      path: page.path,
      component: require.resolve('./src/templates/reference.tsx'),
      context: {
        markdown: md,
        title: page.title,
      },
    });
  });

  // /documentation/wayland/guides/
  createRedirect({
    fromPath: '/documentation/wayland/guides',
    toPath: '/documentation/wayland/guides/introduction',
  });
}
