const API_URL = 'http://localhost:3000';

// Mesas
export async function fetchMesas() {
  const res = await fetch(`${API_URL}/mesas`);
  if (!res.ok) throw new Error('Erro ao buscar mesas');
  return res.json();
}

export async function criarMesa(mesa) {
  const res = await fetch(`${API_URL}/mesas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(mesa),
  });
  if (!res.ok) throw new Error('Erro ao criar mesa');
  return res.json();
}

// Reservas
export async function fetchReservas() {
  const res = await fetch(`${API_URL}/reservas`);
  if (!res.ok) throw new Error('Erro ao buscar reservas');
  return res.json();
}

export async function criarReserva(reserva) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reserva),
  });
  if (!res.ok) throw new Error('Erro ao criar reserva');
  return res.json();
}

// Usuários
export async function fetchUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function criarUsuario(usuario) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario),
  });
  if (!res.ok) throw new Error('Erro ao criar usuário');
  return res.json();
}

// Relatórios — Reservas por período
export async function fetchReservasPorPeriodo(inicio, fim) {
  const res = await fetch(`${API_URL}/relatorios/periodo?inicio=${inicio}&fim=${fim}`);
  if (!res.ok) throw new Error('Erro ao buscar reservas por período');
  return res.json();
}
