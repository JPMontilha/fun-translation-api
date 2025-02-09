import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function TextControlsExample() {
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obter o token JWT do localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Você precisa estar logado para comentar!');
      return;
    }

    try {
      // Decodificar o token para obter o ID do usuário
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Supondo que o ID do usuário esteja no campo 'id'

      // Enviar os dados para a API, com o ID do usuário incluído
      const data = {
        title: titulo,
        description: comentario,
        user: userId,
      };

      // Enviar os dados para a API
      await axios.post('http://localhost:3000/comment/add', data, {
        headers: {
          Authorization: `Bearer ${token}`,  // Incluindo o token JWT no cabeçalho
        },
      });

      alert('Comentário enviado com sucesso!');
      window.location.reload();
      setTitulo(''); // Limpar os campos após o envio
      setComentario('');
    } catch (error) {
      alert('Erro ao enviar comentário: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-white">Pedidos e Opiniões</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="opnionForm.Titulo">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Título"
            name="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // Atualiza o estado de 'titulo'
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="opnionForm.Comentario">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descrição"
            name="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)} // Atualiza o estado de 'comentario'
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export { TextControlsExample };