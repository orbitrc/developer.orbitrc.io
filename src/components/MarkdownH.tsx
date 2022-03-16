import React from 'react'

import './MarkdownH.scss'

interface MarkdownHProps {
  children: React.ReactNode;
  tag: string;
  id: string;
}

const MarkdownHAnchor = (props: { id: string }) => {
  return (
    <a
      className="anchor"
      href={`#${props.id}`}
    >#</a>
  );
}

const MarkdownH = (props: MarkdownHProps) => {
  if (props.tag === 'h1') {
    return (
      <h1
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h1>
    );
  } else if (props.tag === 'h2') {
    return (
      <h2
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h2>
    );
  } else if (props.tag === 'h3') {
    return (
      <h3
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h3>
    );
  } else if (props.tag === 'h4') {
    return (
      <h4
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h4>
    );
  } else if (props.tag === 'h5') {
    return (
      <h5
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h5>
    );
  } else if (props.tag === 'h6') {
    return (
      <h6
        id={props.id}
      >
        {props.children}
        <MarkdownHAnchor
          id={props.id}
        />
      </h6>
    );
  } else {
    return (
      <div
        id={props.id}
      >{props.children}</div>
    );
  }
}

export default MarkdownH
