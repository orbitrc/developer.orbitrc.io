import React, { useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js'

import GuideLayout from 'src/layouts/GuideLayout'
import MarkdownH from 'src/components/MarkdownH'
import MarkdownPre from 'src/components/MarkdownPre'

import { NavigationItem } from 'src/components/Navigation'

interface GuideTemplateProps {
  pageContext: {
    markdown: string;
    navigationItems: NavigationItem[];
  };
}

const GuideTemplate = (props: GuideTemplateProps) => {
  useEffect(() => {
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
      <Markdown
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
  },
} as GuideTemplateProps;

export default GuideTemplate
