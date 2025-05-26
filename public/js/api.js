const API_URL = 'http://localhost:3000';

export async function fetchMesas() {
  const res = await fetch(`${API_URL}/mesas`);
  return res.json();
}

export async function criarMesa(mesa) {
  const res = await fetch(`${API_URL}/mesas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(mesa)
  });
  return res.json();
}

// Similar para reservas e usuários
export async function fetchReservas() {
  const res = await fetch(`${API_URL}/reservas`);
  return res.json();
}

export async function criarReserva(reserva) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reserva)
  });
  return res.json();
}

export async function fetchUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function criarUsuario(usuario) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario)
  });
  return res.json();
}
