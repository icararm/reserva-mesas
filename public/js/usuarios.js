import { fetchUsuarios, criarUsuario } from './api.js';

const usuariosList = document.getElementById('usuarios-list');
const usuarioForm = document.getElementById('usuario-form');

export async function fetchUsuariosHandler() {
  try {
    const usuarios = await fetchUsuarios();
    usuariosList.innerHTML = '';
    usuarios.forEach(usuario => {
      const div = document.createElement('div');
      div.textContent = `Nome: ${usuario.nome} - Email: ${usuario.email} - Tipo: ${usuario.tipo}`;
      usuariosList.appendChild(div);
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

usuarioForm.addEventListener('submit', async e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const tipo = document.getElementById('tipo').value;

  if (!nome || !email || !senha || !tipo) {
    return alert('Preencha todos os campos.');
  }

  try {
    await criarUsuario({ nome, email, senha, tipo });
    usuarioForm.reset();
    fetchUsuariosHandler();
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
});
