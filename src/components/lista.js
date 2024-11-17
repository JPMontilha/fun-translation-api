import React, { useState, useCallback, useEffect } from 'react';
import {
  traduzirParaYoda,
  traduzirParaPirata,
  traduzirParaShakespeare,
  traduzirParaMinion,
  traduzirParaElfico
} from '../api/funTranslateAPI';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Image from 'react-bootstrap/Image';

const Lista = ({ tipoTraducaoInicial }) => {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoTraducao, setTipoTraducao] = useState(tipoTraducaoInicial);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setTipoTraducao(tipoTraducaoInicial);
  }, [tipoTraducaoInicial]);

  // Define os dados das traduções
  const traducoes = {
    yoda: {
      src: 'https://media.tenor.com/N1f-WnXPK8oAAAAM/yoda-yoda-slap.gif',
      title: 'Yoda'
    },
    shakespeare: {
      src: 'https://i.ytimg.com/vi/u0AvQt7wuFA/maxresdefault.jpg',
      title: 'Shakespeare'
    },
    pirata: {
      src: 'https://assetsio.gnwcdn.com/1_Lfp9i4K.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp',
      title: 'Pirata'
    },
    minion: {
      src: 'https://media.tenor.com/l0muoY71-zQAAAAC/minion-but.gif',
      title: 'Minion'
    },
    elfico: {
      src: 'https://i.makeagif.com/media/6-11-2023/ibgwmI.gif',
      title: 'Élfico'
    }
  };

  const traduzir = useCallback(async () => {
    if (textoOriginal.trim() === '') return;

    setLoading(true);
    try {
      let traducao;
      const tradutores = {
        yoda: traduzirParaYoda,
        shakespeare: traduzirParaShakespeare,
        pirata: traduzirParaPirata,
        minion: traduzirParaMinion,
        elfico: traduzirParaElfico
      };

      const tradutorSelecionado = tradutores[tipoTraducao];
      if (tradutorSelecionado) {
        traducao = await tradutorSelecionado(textoOriginal);
        setTextoTraduzido(traducao);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Erro ao traduzir:', error);
    } finally {
      setLoading(false);
    }
  }, [textoOriginal, tipoTraducao]);

  const { src, title } = traducoes[tipoTraducao] || {};

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-4">
        {src && (
          <Image
            src={src}
            roundedCircle
            fluid
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        )}
        {title && <h3 className="mt-3 text-white">{title}</h3>}
      </div>

      <div className="mb-3">
        <textarea
          className="textarea form-control"
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)}
          placeholder="Digite o texto em ingês para traduzir"
        />
      </div>

      <Button
        variant="primary"
        onClick={traduzir}
        disabled={loading}
        size="lg"
        className="mb-3"
      >
        {loading ? 'Traduzindo...' : 'Traduzir'}
      </Button>

      <div className="position-fixed bottom-0 end-0 p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          className="custom-toast"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Tradução Completa</strong>
          </Toast.Header>
          <Toast.Body className="toast-text">{textoTraduzido}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default Lista;