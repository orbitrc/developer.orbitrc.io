import React from 'react'

interface MarkdownPreProps {
  children: React.ReactNode;
}

const MarkdownPre = (props: MarkdownPreProps) => {
  let className = React.isValidElement(props.children)
    ? props.children.props.className
    : '';
  className = className.replace('lang', 'language');
  className = className.replace('-sh', '-shell');
  const children = React.isValidElement(props.children)
    ? props.children.props.children
    : '';

  return (
    <pre>
      <code
        className={className}
      >
        {children}
      </code>
    </pre>
  );
}

export default MarkdownPre
