import axios from 'axios'; // Usando axios para as requisições HTTP

const BASE_URL = 'https://api.funtranslations.com/translate/';

class APIConnection {
  constructor() {
    this.authToken = null; // Armazena o token de autenticação
  }

  // Método para fazer as requisições
  async req(tipo, rota, data = null) {
    try {
      const config = {
        method: tipo,
        url: `${BASE_URL}${rota}`,
        headers: {
          'Content-Type': 'application/json',
          ...(this.authToken && { 'Authorization': `Bearer ${this.authToken}` }) // Adiciona o token se existir
        },
        ...(data && { data }) // Inclui `data` apenas se ele existir
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`Erro na requisição ${tipo} para ${rota}:`, error);
      throw error;
    }
  }

  // Método para criar o token de autenticação
  async createAuthToken() {
    try {
      const data = {
        username: 'admin',
        password: 'password123'
      };
      const response = await this.req('post', '/auth', data);
      this.authToken = response.token; // Armazena o token para uso futuro
      console.log("Token gerado com sucesso:", this.authToken);
      return this.authToken;
    } catch (error) {
      console.error("Erro ao gerar o token:", error);
      throw error;
    }
  }
}

export default APIConnection;
