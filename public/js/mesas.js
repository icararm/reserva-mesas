import { fetchMesas, criarMesa } from './api.js';

const mesasList = document.getElementById('mesas-list');
const mesaForm = document.getElementById('mesa-form');

export async function fetchMesasHandler() {
  try {
    const mesas = await fetchMesas();
    mesasList.innerHTML = '';
    mesas.forEach(mesa => {
      const div = document.createElement('div');
      div.textContent = `Mesa ${mesa.numero} - Capacidade: ${mesa.capacidade}`;
      mesasList.appendChild(div);
    });
  } catch (error) {
    console.error('Erro ao buscar mesas:', error);
  }
}

mesaForm.addEventListener('submit', async e => {
  e.preventDefault();
  const numero = Number(document.getElementById('numero').value);
  const capacidade = Number(document.getElementById('capacidade').value);

  if (!numero || !capacidade) return alert('Preencha os campos corretamente.');

  try {
    await criarMesa({ numero, capacidade });
    mesaForm.reset();
    fetchMesasHandler();
  } catch (error) {
    console.error('Erro ao criar mesa:', error);
  }
});
