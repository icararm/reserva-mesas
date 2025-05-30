// public/js/garcom.js

const lista = document.getElementById('listaReservasGarcom');

async function carregarReservasPendentes() {
  try {
    const res = await fetch('/api/garcom/reservas/pendentes');
    const reservas = await res.json();

    lista.innerHTML = '';
    reservas.forEach((r) => {
      const li = document.createElement('li');
      li.textContent = `${r.data} ${r.hora} - Mesa ${r.mesa} - ${r.nome_cliente}`;
      const btn = document.createElement('button');
      btn.textContent = 'Confirmar';
      btn.onclick = () => confirmarReserva(r.id);
      li.appendChild(btn);
      lista.appendChild(li);
    });
  } catch (err) {
    console.error('Erro ao carregar reservas:', err);
  }
}

async function confirmarReserva(id) {
  try {
    const res = await fetch(`/api/garcom/reservas/${id}/confirmar`, {
      method: 'PUT'
    });

    if (!res.ok) throw new Error('Erro ao confirmar reserva');
    alert('Reserva confirmada!');
    carregarReservasPendentes();
  } catch (err) {
    alert(err.message);
  }
}

carregarReservasPendentes();
