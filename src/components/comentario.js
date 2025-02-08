import React from 'react';
import { Button, Form } from 'react-bootstrap';

function TextControlsExample() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página
    const formData = new FormData(event.target); // Captura os dados do formulário
    const data = Object.fromEntries(formData); // Converte os dados para um objeto
    console.log('Dados do formulário:', data); // Exibe os dados no console
    alert('Formulário enviado com sucesso!'); // Feedback para o usuário
  };

  return (
    <div>
      {/* Título */}
      <h2 class="text-white" >Pedidos e Opiniões</h2>

      {/* Formulário */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="opnionForm.Titulo">
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Título"
            name="titulo" // Adicione um nome para o campo
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="opnionForm.Comentario">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descrição"
            name="comentario" // Adicione um nome para o campo
          />
        </Form.Group>
        {/* Botão de envio */}
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export { TextControlsExample }; // Exportação nomeada