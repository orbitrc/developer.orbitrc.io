import React from 'react'
import { Link } from 'gatsby'

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
    <Link
      className={`od-card ${props.className}`}
      to={props.to}
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
    </Link>
  );
}

Card.defaultProps = {
  className: '',
  backgroundColor: 'cyan',
}

export default Card
