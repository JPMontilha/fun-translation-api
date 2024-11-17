import React from 'react';
import { Nav } from 'react-bootstrap';
import { List, House, X } from 'react-bootstrap-icons';

const Sidebar = ({ isOpen, toggleSidebar, onNavigate, currentTranslation }) => {
  const translations = [
    { id: 'yoda', name: 'Yoda' },
    { id: 'shakespeare', name: 'Shakespeare' },
    { id: 'pirata', name: 'Pirata' },
    { id: 'minion', name: 'Minion' },
    { id: 'elfico', name: 'Élfico' }
  ];

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
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;