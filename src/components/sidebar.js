import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { List, House, X, Chat } from 'react-bootstrap-icons'; // Adicione o ícone de chat
import { AuthButtons } from './formulario.js';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate, currentTranslation }) => {
  const translations = [
    { id: 'yoda', name: 'Yoda' },
    { id: 'shakespeare', name: 'Shakespeare' },
    { id: 'pirata', name: 'Pirata' },
    { id: 'minion', name: 'Minion' },
    { id: 'elfico', name: 'Élfico' }
  ];

  // Verifica se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifique se o token de autenticação existe no localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {/* Botão de toggle */}
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <List size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <Nav className="flex-column">
          <Nav.Link 
            className="sidebar-link d-flex align-items-center"
            onClick={() => onNavigate('home')}
          >
            <House size={20} className="me-2" />
            Home
          </Nav.Link>

          <AuthButtons />

          <hr className="sidebar-divider" />
          
          <div className="sidebar-heading">Traduções</div>
          
          {translations.map((translation) => (
            <Nav.Link
              key={translation.id}
              className={`sidebar-link ${currentTranslation === translation.id ? 'active' : ''}`}
              onClick={() => onNavigate(translation.id)}
            >
              {translation.name}
            </Nav.Link>
          ))}

          {/* Botão de Comentários só aparece se o usuário estiver logado */}
          {isLoggedIn && (
            <Nav.Link
              className="sidebar-link d-flex align-items-center"
              onClick={() => onNavigate('comments')}
            >
              <Chat size={20} className="me-2" />
              Comentários
            </Nav.Link>
          )}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
