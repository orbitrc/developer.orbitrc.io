import React from 'react'
import Markdown from 'markdown-to-jsx'

import Seo from 'src/components/Seo'

import ReferenceLayout from 'src/layouts/ReferenceLayout'
import MarkdownH from 'src/components/MarkdownH'
import MarkdownPre from 'src/components/MarkdownPre'

interface ReferenceTemplateProps {
  pageContext: {
    markdown: string;
    title: string;
  };
}

const ReferenceTemplate = (props: ReferenceTemplateProps) => {
  return (
    <ReferenceLayout
      className="reference-template"
    >
      <Seo
        title="Primer API"
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
    </ReferenceLayout>
  );
}

ReferenceTemplate.defaultProps = {
  pageContext: {
    markdown: '',
    navigationItems: [],
    title: '',
  },
} as ReferenceTemplateProps;

export default ReferenceTemplate
