import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './connection.js';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from './controllers/userCtrl.js';
import { createComment, getComments, getCommentById, updateComment, deleteComment, getCommentsByUser } from './controllers/commentCtrl.js';

// Carrega as variáveis de ambiente
dotenv.config();

const testControllers = async () => {
  try {
    // Conecta ao MongoDB
    await connectDB();

    // Teste do User Controller
    console.log('=== Testando User Controller ===');

    // 1. Criar um usuário
    let newUser;
    await createUser(
      {
        body: {
          user: 'tesstuser',
          email: 'tesst@example.com',
          password: 'tesstpassword123',
        },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Usuário criado:', data);
            newUser = data; // Armazena o usuário criado
            return data;
          },
        }),
      }
    );

    // Verifica se o usuário foi criado
    if (!newUser) {
      throw new Error('Falha ao criar o usuário');
    }

    // 2. Buscar todos os usuários
    await getUsers({}, {
      status: (code) => ({
        json: (data) => {
          console.log('Usuários encontrados:', data);
          return data;
        },
      }),
    });

    // 3. Buscar usuário por ID
    await getUserById(
      {
        params: { id: newUser._id },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Usuário encontrado por ID:', data);
            return data;
          },
        }),
      }
    );

    // 4. Atualizar usuário
    await updateUser(
      {
        params: { id: newUser._id },
        body: { email: 'updateddd@example.com' },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Usuário atualizado:', data);
            return data;
          },
        }),
      }
    );

    // 5. Deletar usuário
    // await deleteUser(
    //   {
    //     params: { id: newUser._id },
    //   },
    //   {
    //     status: (code) => ({
    //       json: (data) => {
    //         console.log('Usuário deletado:', data);
    //         return data;
    //       },
    //     }),
    //   }
    // );

    // Teste do Comment Controller
    console.log('=== Testando Comment Controller ===');

    // 1. Criar um comentário
    let newComment;
    await createComment(
      {
        body: {
          user: newUser._id,
          title: 'Test Comment',
          description: 'This is a test comment',
        },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Comentário criado:', data);
            newComment = data; // Armazena o comentário criado
            return data;
          },
        }),
      }
    );

    // Verifica se o comentário foi criado
    if (!newComment) {
      throw new Error('Falha ao criar o comentário');
    }

    // 2. Buscar todos os comentários
    await getComments({}, {
      status: (code) => ({
        json: (data) => {
          console.log('Comentários encontrados:', data);
          return data;
        },
      }),
    });

    // 3. Buscar comentário por ID
    await getCommentById(
      {
        params: { id: newComment._id },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Comentário encontrado por ID:', data);
            return data;
          },
        }),
      }
    );

    // 4. Atualizar comentário
    await updateComment(
      {
        params: { id: newComment._id },
        body: { title: 'Updated Comment', description: 'This is an updated comment' },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Comentário atualizado:', data);
            return data;
          },
        }),
      }
    );

    // 5. Deletar comentário
    // await deleteComment(
    //   {
    //     params: { id: newComment._id },
    //   },
    //   {
    //     status: (code) => ({
    //       json: (data) => {
    //         console.log('Comentário deletado:', data);
    //         return data;
    //       },
    //     }),
    //   }
    // );

    // 6. Buscar comentários por usuário
    await getCommentsByUser(
      {
        params: { userId: newUser._id },
      },
      {
        status: (code) => ({
          json: (data) => {
            console.log('Comentários do usuário:', data);
            return data;
          },
        }),
      }
    );

  } catch (error) {
    console.error('Teste falhou:', error);
  } finally {
    // Fecha a conexão com o MongoDB
    await mongoose.connection.close();
  }
};

testControllers();