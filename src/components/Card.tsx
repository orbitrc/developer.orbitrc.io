import React from 'react'

import './Card.scss'

interface CardProps {
  className: string;
  to: string;
  image: string;
  backgroundColor: string;
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  return (
    <a
      className={`od-card ${props.className}`}
      href={props.to}
    >
      <div
        className="od-card__cover"
        style={{
          backgroundColor: props.backgroundColor,
        }}
      >
        <img
          src={props.image}
        />
      </div>
      <div
        className="od-card__detail"
      >
        <div
          className="od-card__title"
        >
          {props.title}
        </div>
        <div
          className="od-card__description"
        >
          {props.description}
        </div>
      </div>
    </a>
  );
}

Card.defaultProps = {
  className: '',
  backgroundColor: 'cyan',
}

export default Card
