import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardExample({ src, title, text, option, onSelect }) {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={src} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
          <Button variant="primary" onClick={() => onSelect(option)}>
            Vamos Conversar
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardExample;
