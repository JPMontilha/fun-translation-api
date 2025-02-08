import React, { useState } from 'react';
import './App.css';
import Lista from './components/lista.js';
import CardExample from './components/cards.js';
import Sidebar from './components/sidebar.js';
import { TextControlsExample } from './components/comentario.js';
import { CardGroup, Row, Col, CloseButton } from 'react-bootstrap';
import CommentSystem from './components/listaComentario.js'; // Importação correta

function App() {
  const [showCards, setShowCards] = useState(true);
  const [tipoTraducao, setTipoTraducao] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showComments, setShowComments] = useState(false); // Novo estado para controlar a tela de comentários

  const handleCardSelect = (option) => {
    setTipoTraducao(option);
    setShowCards(false);
    setShowComments(false); // Certifique-se de que a tela de comentários não está visível
  };

  const handleClose = () => {
    setShowCards(true);
    setTipoTraducao(null);
    setShowComments(false); // Certifique-se de que a tela de comentários não está visível
  };

  const handleNavigate = (destination) => {
    if (destination === 'home') {
      setShowCards(true);
      setTipoTraducao(null);
      setShowComments(false); // Certifique-se de que a tela de comentários não está visível
    } else if (destination === 'comments') {
      setShowCards(false);
      setTipoTraducao(null);
      setShowComments(true); // Mostra a tela de comentários
    } else {
      setShowCards(false);
      setTipoTraducao(destination);
      setShowComments(false); // Certifique-se de que a tela de comentários não está visível
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="App">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigate={handleNavigate}
        currentTranslation={tipoTraducao}
      />

      <header className="App-header">
        <div className="header-left"></div>

        <div className="header-center">
          <h2>Tradutor FunTranslations</h2>
        </div>

        <div className="header-right">
          {(!showCards || showComments) && (
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
          <>
            <CardGroup>
              <Row className="justify-content-center">
                {[
                  { src: 'https://media.tenor.com/N1f-WnXPK8oAAAAM/yoda-yoda-slap.gif', title: 'Yoda', text: 'Traduza para o estilo Yoda.', option: 'yoda' },
                  { src: 'https://i.ytimg.com/vi/u0AvQt7wuFA/maxresdefault.jpg', title: 'Shakespeare', text: 'Traduza para o estilo Shakespeare.', option: 'shakespeare' },
                  { src: 'https://assetsio.gnwcdn.com/1_Lfp9i4K.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp', title: 'Pirata', text: 'Traduza para o estilo Pirata.', option: 'pirata' },
                  { src: 'https://media.tenor.com/l0muoY71-zQAAAAC/minion-but.gif', title: 'Minion', text: 'Traduza para o estilo Minion.', option: 'minion' },
                  { src: 'https://i.makeagif.com/media/6-11-2023/ibgwmI.gif', title: 'Élfico', text: 'Traduza para o estilo Élfico.', option: 'elfico' }
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

            {/* Renderiza o TextControlsExample apenas na página inicial */}
            <TextControlsExample />
          </>
        ) : showComments ? (
          <CommentSystem /> // Renderiza a tela de comentários
        ) : (
          <Lista tipoTraducaoInicial={tipoTraducao} />
        )}
      </main>
    </div>
  );
}

export default App;