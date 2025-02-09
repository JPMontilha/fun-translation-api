import React, { useState, useEffect } from 'react'; // Adicionar useEffect aqui
import { Form, Button, Pagination, Accordion } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import axios from 'axios'; // Adicionar axios
import { TextControlsExample } from './comentario.js'; // Importe o componente

function CommentSystem() {
  const [comments, setComments] = useState([]); // Lista de comentários
  const [searchTerm, setSearchTerm] = useState(''); // Termo de busca
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  // Função para buscar comentários do banco de dados
  const fetchComments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/comment/comments'); // Requisição GET para pegar os comentários
      setComments(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar comentários', error);
      alert('Erro ao buscar comentários' + (error.response?.data?.message || error.message));
    }
  };

  // Chamada para buscar os comentários assim que o componente for montado
  useEffect(() => {
    fetchComments();
  }, []); // O array vazio [] faz a chamada apenas na montagem inicial

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    setComments([data, ...comments]); // Adiciona novos comentários no topo
    event.target.reset();
  };

  const filteredComments = comments.filter((comment) =>
    comment.title.toLowerCase().startsWith(searchTerm.toLowerCase()) // Pesquisa exata pelo início
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
              {comment.title}
            </Accordion.Header>
            <Accordion.Body>{comment.description}</Accordion.Body>
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

      <TextControlsExample />

    </div>
  );
}

export default CommentSystem;
