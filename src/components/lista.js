import React, { useState, useCallback } from 'react';
import { traduzirParaYoda } from '../api/funTranslateAPI'; // Importando as funções de tradução

const Lista = () => {
  const [textoOriginal, setTextoOriginal] = useState('');
  const [textoTraduzido, setTextoTraduzido] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipoTraducao, setTipoTraducao] = useState('yoda'); // Controla o tipo de tradução

  // Função para tratar a tradução
  const traduzir = useCallback(async () => {
    if (textoOriginal.trim() === '') return; // Evita tradução vazia

    setLoading(true); // Começa o loading
    try {
      let traducao;
      switch (tipoTraducao) {

        case 'yoda':
          traducao = await traduzirParaYoda(textoOriginal);
          break;

        default:
          break;
      }
      setTextoTraduzido(traducao); // Atualiza o texto traduzido
    } catch (error) {
      console.error('Erro ao traduzir:', error);
    }
    setLoading(false); // Finaliza o loading
  }, [textoOriginal, tipoTraducao]);

  return (
    <div>
      <h2>Tradutor FunTranslations</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="5"
          value={textoOriginal}
          onChange={(e) => setTextoOriginal(e.target.value)} // Atualiza o texto original
          placeholder="Digite o texto para traduzir"
        />
      </div>
      <div className="mb-3">
        <select
          className="form-control"
          value={tipoTraducao}
          onChange={(e) => setTipoTraducao(e.target.value)} // Atualiza o tipo de tradução
        >
          <option value="yoda">Yoda</option>
        </select>
      </div>
      <button
        className="btn btn-primary"
        onClick={traduzir}
        disabled={loading}
      >
        {loading ? 'Traduzindo...' : 'Traduzir'}
      </button>
      <div className="mt-3">
        <h3>Texto Traduzido:</h3>
        <p>{textoTraduzido}</p>
      </div>
    </div>
  );
};

export default Lista;
