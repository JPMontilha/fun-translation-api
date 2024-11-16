import React, { useState } from 'react';
import './App.css';
import Lista from './components/lista';
import CardExample from './components/cards';
import { CardGroup, Row, Col, CloseButton } from 'react-bootstrap';

function App() {
  const [showCards, setShowCards] = useState(true);
  const [tipoTraducao, setTipoTraducao] = useState(null);

  const handleCardSelect = (option) => {
    setTipoTraducao(option);
    setShowCards(false);
  };

  const handleClose = () => {
    setShowCards(true);
    setTipoTraducao(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left"></div> {/* Esquerda - pode ser usada para algo no futuro */}
        
        <div className="header-center">
          <h2>Tradutor FunTranslations</h2>
        </div>

        <div className="header-right">
          {!showCards && (
            <CloseButton 
            onClick={handleClose} 
            className="close-button-custom btn-close-white" 
            aria-label="Close" 
          />
          )}
        </div>

      </header>

      <main className="App-main">
        {showCards ? (
          <CardGroup>
            <Row className="justify-content-center">
              {[{ src: 'https://media.tenor.com/N1f-WnXPK8oAAAAM/yoda-yoda-slap.gif', title: 'Yoda', text: 'Traduza para o estilo Yoda.', option: 'yoda' },
                { src: 'https://i.ytimg.com/vi/u0AvQt7wuFA/maxresdefault.jpg', title: 'Shakespeare', text: 'Traduza para o estilo Shakespeare.', option: 'shakespeare' },
                { src: 'https://assetsio.gnwcdn.com/1_Lfp9i4K.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp', title: 'Pirata', text: 'Traduza para o estilo Pirata.', option: 'pirata' },
                { src: 'https://media.tenor.com/l0muoY71-zQAAAAC/minion-but.gif', title: 'Minion', text: 'Traduza para o estilo Minion.', option: 'minion' }
              ].map((card, index) => (
                <Col key={index} md={4} className="d-flex justify-content-center mb-4">
                  <CardExample
                    src={card.src}
                    title={card.title}
                    text={card.text}
                    option={card.option}
                    onSelect={handleCardSelect}
                  />
                </Col>
              ))}
            </Row>
          </CardGroup>
        ) : (
          <Lista tipoTraducaoInicial={tipoTraducao} />
        )}
      </main>
    </div>
  );
}

export default App;
