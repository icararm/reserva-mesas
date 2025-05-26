import { fetchReservas, criarReserva } from './api.js';

const reservasList = document.getElementById('reservas-list');
const reservaForm = document.getElementById('reserva-form');

export async function fetchReservasHandler() {
  try {
    const reservas = await fetchReservas();
    reservasList.innerHTML = '';
    reservas.forEach(reserva => {
      const div = document.createElement('div');
      div.textContent = `Cliente: ${reserva.cliente} - Mesa: ${reserva.mesa_id} - Data: ${reserva.data_reserva} - Horário: ${reserva.horario_inicio} - Status: ${reserva.status}`;
      reservasList.appendChild(div);
    });
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
  }
}

reservaForm.addEventListener('submit', async e => {
  e.preventDefault();
  const cliente = document.getElementById('cliente').value;
  const mesa_id = Number(document.getElementById('mesa_id').value);
  const data_reserva = document.getElementById('data_reserva').value;
  const horario_inicio = document.getElementById('horario_inicio').value;
  const status = document.getElementById('status').value;
  const atendente_id = Number(document.getElementById('atendente_id').value);

  if (!cliente || !mesa_id || !data_reserva || !horario_inicio) {
    return alert('Preencha os campos obrigatórios.');
  }

  try {
    await criarReserva({ cliente, mesa_id, data_reserva, horario_inicio, status, atendente_id });
    reservaForm.reset();
    fetchReservasHandler();
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
  }
});
