import APIConnection from './connection'; // Importa a classe de conexão

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
