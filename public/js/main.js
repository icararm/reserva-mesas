import { fetchMesasHandler, setupMesasForm } from './mesas.js';
import { fetchReservasHandler, setupReservasForm } from './reservas.js';
import { fetchUsuariosHandler, setupUsuariosForm } from './usuarios.js';

let userType = null;

export function init(user) {
  userType = user;

  if (userType === 'atendente') {
    fetchMesasHandler();
    setupMesasForm();
  } else if (userType === 'garcom') {
    fetchReservasHandler();
    setupReservasForm();
  } else if (userType === 'gerente') {
    fetchMesasHandler();
    fetchReservasHandler();
    fetchUsuariosHandler();
    setupMesasForm();
    setupReservasForm();
    setupUsuariosForm();
  }
}
