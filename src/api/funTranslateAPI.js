import APIConnection from './connection.js'; // Importa a classe de conexão

const apiConnection = new APIConnection(); // Instância de APIConnection

// Função para traduzir para Yoda
export const traduzirParaYoda = async (texto) => {
  try {
    const response = await apiConnection.req(
      'get', 
      `yoda.json?text=${encodeURIComponent(texto)}`
    );
    return response.contents.translated; // Retorna a tradução
  } catch (error) {
    console.error("Erro ao traduzir para Yoda:", error);
    throw error;
  }
};

// Função para traduzir para Shakespeare
export const traduzirParaShakespeare = async (texto) => {
  try {
    const response = await apiConnection.req(
      'get', 
      `shakespeare.json?text=${encodeURIComponent(texto)}`
    );
    return response.contents.translated; // Retorna a tradução
  } catch (error) {
    console.error("Erro ao traduzir para Shakespeare:", error);
    throw error;
  }
};

// Função para traduzir para Pirata
export const traduzirParaPirata = async (texto) => {
  try {
    const response = await apiConnection.req(
      'get', 
      `pirate.json?text=${encodeURIComponent(texto)}`
    );
    return response.contents.translated; // Retorna a tradução
  } catch (error) {
    console.error("Erro ao traduzir para Pirata:", error);
    throw error;
  }
};

// Função para traduzir para Minion
export const traduzirParaMinion = async (texto) => {
  try {
    const response = await apiConnection.req(
      'get', 
      `minion.json?text=${encodeURIComponent(texto)}`
    );
    return response.contents.translated; // Retorna a tradução
  } catch (error) {
    console.error("Erro ao traduzir para Minion:", error);
    throw error;
  }
};

export const traduzirParaElfico = async (texto) => {
  try {
    const response = await apiConnection.req(
      'get', 
      `sindarin.json?text=${encodeURIComponent(texto)}`
    );
    return response.contents.translated; // Retorna a tradução
  } catch (error) {
    console.error("Erro ao traduzir para Elfico:", error);
    throw error;
  }
};