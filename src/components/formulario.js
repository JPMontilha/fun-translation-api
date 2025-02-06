import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'; // Importe o componente Button
import { Person, PersonPlus, BoxArrowRight } from 'react-bootstrap-icons';

// Componente Offcanvas reutilizável
function AuthOffcanvas({ show, onHide, title, onSubmit, buttonText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="bottom" className="custom-offcanvas">
      <Offcanvas.Header closeButton className="custom-header">
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="custom-body">
        <Form onSubmit={handleSubmit} className="auth-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>

          {/* Substitua Nav.Link por Button */}
          <Button variant="primary" type="submit" className="custom-button">
            {buttonText}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function AuthButtons() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [logado, setLogado] = useState(false); // Estado para controlar se o usuário está logado

  const handleLoginSubmit = (data) => {
    console.log('Dados do Login:', data);
    alert('Login realizado com sucesso!');
    setLogado(true); // Define o estado como logado
  };

  const handleCadastroSubmit = (data) => {
    console.log('Dados do Cadastro:', data);
    alert('Cadastro realizado com sucesso!');
  };

  const handleLogout = () => {
    setLogado(false); // Define o estado como não logado
    alert('Você saiu da sua conta.');
  };

  return (
    <div className="nav-container">
      <Nav className="d-flex justify-content-between w-100">
        {logado ? (
          // Se estiver logado, mostra apenas o botão "Sair"
          <Nav.Link
            onClick={handleLogout}
            className="custom-button"
          >
            <BoxArrowRight className="me-2" /> {/* Ícone de Sair */}
            Sair
          </Nav.Link>
        ) : (
          // Se não estiver logado, mostra os botões "Login" e "Cadastro"
          <>
            <Nav.Link
              onClick={() => setShowLogin(true)}
              className="custom-button"
            >
              <Person className="me-2" /> {/* Ícone de Login */}
              Login
            </Nav.Link>
            <Nav.Link
              onClick={() => setShowCadastro(true)}
              className="custom-button"
            >
              <PersonPlus className="me-2" /> {/* Ícone de Cadastro */}
              Cadastro
            </Nav.Link>
          </>
        )}
      </Nav>

      {/* Offcanvas de Login */}
      <AuthOffcanvas
        show={showLogin}
        onHide={() => setShowLogin(false)}
        title="Login"
        onSubmit={handleLoginSubmit}
        buttonText="Entrar"
      />

      {/* Offcanvas de Cadastro */}
      <AuthOffcanvas
        show={showCadastro}
        onHide={() => setShowCadastro(false)}
        title="Cadastro"
        onSubmit={handleCadastroSubmit}
        buttonText="Cadastrar"
      />
    </div>
  );
}

export { AuthButtons };