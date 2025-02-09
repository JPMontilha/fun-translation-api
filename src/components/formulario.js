import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Offcanvas, Form, Nav } from 'react-bootstrap';
import { Person, PersonPlus, BoxArrowRight } from 'react-bootstrap-icons';

// Componente Offcanvas reutilizável
function AuthOffcanvas({ show, onHide, title, onSubmit, buttonText }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ user, email, password });
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="bottom">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsuario">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="usuario"
              placeholder="Digite seu usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {buttonText}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

// Componente principal de Autenticação
function AuthButtons() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCadastro, setShowCadastro] = useState(false);
  const [logado, setLogado] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      setLogado(true);
    }
  }, []);

  // Função para fazer login
  const handleLoginSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', data);
      const receivedToken = response.data.token;
      setToken(receivedToken);
      setLogado(true);
      localStorage.setItem('authToken', receivedToken);
      alert('Login realizado com sucesso!');
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao fazer login.');
    }
  };

  // Função para cadastrar usuário
  const handleCadastroSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3000/auth/register', data);
      alert('Cadastro realizado com sucesso!');
      setShowCadastro(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao cadastrar.');
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setLogado(false);
    alert('Você saiu da sua conta.');
  };

  return (
    <div>
      <Nav className="d-flex justify-content-between">
        {logado ? (
          <Nav.Link onClick={handleLogout}>
            <BoxArrowRight className="me-2" /> Sair
          </Nav.Link>
        ) : (
          <>
            <Nav.Link onClick={() => setShowLogin(true)}>
              <Person className="me-2" /> Login
            </Nav.Link>
            <Nav.Link onClick={() => setShowCadastro(true)}>
              <PersonPlus className="me-2" /> Cadastro
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
