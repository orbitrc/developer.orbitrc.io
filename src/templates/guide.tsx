import React from 'react'
import Markdown from 'markdown-to-jsx'

interface GuideTemplateProps {
  pageContext: {
    markdown: string;
  };
}

const GuideTemplate = (props: GuideTemplateProps) => {
  console.log(props);
  return (
    <div>
      <Markdown>
        {props.pageContext.markdown}
      </Markdown>
    </div>
  );
}

export default GuideTemplate
