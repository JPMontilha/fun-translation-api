import React, { useState } from 'react';
import { Form, Button, Pagination, Accordion } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

function CommentSystem() {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setComments([data, ...comments]); // Adiciona novos comentários no topo
    event.target.reset();
  };

  const filteredComments = comments.filter((comment) =>
    comment.titulo.toLowerCase().startsWith(searchTerm.toLowerCase()) // Pesquisa exata pelo início
  );

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Barra de pesquisa */}
      <Form.Group className="mb-4" controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Pesquisar por título..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Form.Group>

      {/* Título "Lista de Comentários" */}
      <h3 className="text-white mb-3">Lista de Comentários</h3>

      {/* Lista de comentários (Accordions) */}
      <Accordion className="mb-4">
        {currentComments.map((comment, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              <Button
                variant="link"
                size="sm"
                className="me-2 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedComments = comments.filter((_, i) => i !== index + indexOfFirstComment);
                  setComments(updatedComments);
                }}
              >
                <X size={14} color="black" />
              </Button>
              {comment.titulo}
            </Accordion.Header>
            <Accordion.Body>{comment.comentario}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination className="mb-4 justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

      {/* Título "Pedidos e Opiniões" */}
      <h2 className="text-white mb-4">Pedidos e Opiniões</h2>

      {/* Formulário de comentários */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="opnionForm.Titulo">
          <Form.Control as="textarea" rows={1} placeholder="Título" name="titulo" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="opnionForm.Comentario">
          <Form.Control as="textarea" rows={3} placeholder="Descrição" name="comentario" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export default CommentSystem;