// public/js/atendente.js

const form = document.getElementById('formReserva');
const lista = document.getElementById('listaReservas');

// Criar reserva
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const reserva = Object.fromEntries(formData);

  try {
    const res = await fetch('/api/atendente/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva),
    });

    if (!res.ok) throw new Error('Erro ao criar reserva');
    alert('Reserva criada com sucesso!');
    form.reset();
    carregarReservas();
  } catch (err) {
    alert(err.message);
  }
});

// Buscar reservas pendentes
async function carregarReservas() {
  try {
    const res = await fetch('/api/atendente/reservas/pendentes');
    const reservas = await res.json();

    lista.innerHTML = '';
    reservas.forEach((r) => {
      const li = document.createElement('li');
      li.textContent = `${r.data} ${r.hora} - Mesa ${r.mesa} - ${r.nome_cliente}`;
      const btn = document.createElement('button');
      btn.textContent = 'Cancelar';
      btn.onclick = () => cancelarReserva(r.id);
      li.appendChild(btn);
      lista.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

async function cancelarReserva(id) {
  if (!confirm('Deseja cancelar esta reserva?')) return;

  try {
    const res = await fetch(`/api/atendente/reservas/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Erro ao cancelar reserva');
    alert('Reserva cancelada.');
    carregarReservas();
  } catch (err) {
    alert(err.message);
  }
}

document.addEventListener('DOMContentLoaded', carregarReservas);


