import React, { useState, useCallback, useEffect } from 'react';
import {
  traduzirParaYoda,
  traduzirParaPirata,
  traduzirParaShakespeare,
  traduzirParaMinion
} from '../api/funTranslateAPI';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

const Lista = ({ tipoTraducaoInicial }) => {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoTraducao, setTipoTraducao] = useState(tipoTraducaoInicial);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setTipoTraducao(tipoTraducaoInicial);
  }, [tipoTraducaoInicial]);

  const traduzir = useCallback(async () => {
    if (textoOriginal.trim() === '') return;

    setLoading(true);
    try {
      let traducao;
      switch (tipoTraducao) {
        case 'yoda':
          traducao = await traduzirParaYoda(textoOriginal);
          break;
        case 'shakespeare':
          traducao = await traduzirParaShakespeare(textoOriginal);
          break;
        case 'pirata':
          traducao = await traduzirParaPirata(textoOriginal);
          break;
        case 'minion':
          traducao = await traduzirParaMinion(textoOriginal);
          break;
        default:
          break;
      }
      setTextoTraduzido(traducao);
      setShowToast(true);
    } catch (error) {
      console.error('Erro ao traduzir:', error);
    }
    setLoading(false);
  }, [textoOriginal, tipoTraducao]);

  return (
    <div>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="5"
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)}
          placeholder="Digite o texto para traduzir"
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={tipoTraducao}
          onChange={(e) => setTipoTraducao(e.target.value)}
        >
          <option value="yoda">Yoda</option>
          <option value="shakespeare">Shakespeare</option>
          <option value="pirata">Pirata</option>
          <option value="minion">Minion</option>
        </select>
      </div>
      <Button
        variant="primary"
        onClick={traduzir}
        disabled={loading}
        size="lg"
      >
        {loading ? 'Traduzindo...' : 'Traduzir'}
      </Button>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        className="mt-3"
      >
        <Toast.Header>
          <strong className="me-auto">Tradução Completa</strong>
        </Toast.Header>
        <Toast.Body className='toast-text'>{textoTraduzido}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Lista;
