import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js'
// @ts-ignore
import hljsStyle from 'highlight.js/styles/monokai.css'

import Seo from 'src/components/Seo'

import GuideLayout from 'src/layouts/GuideLayout'
import MarkdownH from 'src/components/MarkdownH'
import MarkdownPre from 'src/components/MarkdownPre'

import { NavigationItem } from 'src/components/Navigation'

interface GuideTemplateProps {
  pageContext: {
    markdown: string;
    navigationItems: NavigationItem[];
    title: string;
  };
}

const GuideTemplate = (props: GuideTemplateProps) => {
  void(hljsStyle); // I don't know but this line loads stylesheet.
  useEffect(() => {
    // Do highlight.
    const code = document.querySelectorAll('pre code');
    code.forEach((val => {
      hljs.highlightElement(val as HTMLElement);
    }));
  }, []);

  return (
    <GuideLayout
      className="guide-template"
      navigationItems={props.pageContext.navigationItems}
    >
      <Seo
        title={props.pageContext.title}
      />
      <Markdown
        className="od-markdown-content"
        options={{
          overrides: {
            h1: {
              component: MarkdownH,
              props: {
                tag: 'h1',
              },
            },
            h2: {
              component: MarkdownH,
              props: {
                tag: 'h2',
              },
            },
            h3: {
              component: MarkdownH,
              props: {
                tag: 'h3',
              },
            },
            pre: {
              component: MarkdownPre,
            },
          },
        }}
      >
        {props.pageContext.markdown}
      </Markdown>
    </GuideLayout>
  );
}

GuideTemplate.defaultProps = {
  pageContext: {
    markdown: '',
    navigationItems: [],
    title: '',
  },
} as GuideTemplateProps;

export default GuideTemplate
