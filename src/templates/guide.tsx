import React from 'react'
import Markdown from 'markdown-to-jsx'

import GuideLayout from 'src/layouts/GuideLayout'

interface GuideTemplateProps {
  pageContext: {
    markdown: string;
  };
}

const GuideTemplate = (props: GuideTemplateProps) => {
  console.log(props);
  return (
    <GuideLayout
      className="guide-template"
    >
      <Markdown>
        {props.pageContext.markdown}
      </Markdown>
    </GuideLayout>
  );
}

export default GuideTemplate
