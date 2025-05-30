// public/js/gerente.js

const form = document.getElementById('formRelatorio');
const resultado = document.getElementById('resultadoRelatorio');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = new FormData(form);
  const inicio = dados.get('inicio');
  const fim = dados.get('fim');

  try {
    const res = await fetch(`/api/gerente/relatorios/periodo?inicio=${inicio}&fim=${fim}`);
    if (!res.ok) throw new Error('Erro ao gerar relatório');
    const data = await res.json();

    // Aqui a mudança para mostrar tabela:
    resultado.innerHTML = criarTabela(data);
  } catch (err) {
    alert('Erro ao gerar relatório');
    console.error(err);
  }
});

function criarTabela(relatorio) {
  if (relatorio.length === 0) return '<p>Nenhum dado encontrado.</p>';

  let tabela = '<table border="1" cellpadding="5" cellspacing="0">';
  tabela += '<thead><tr>';
  Object.keys(relatorio[0]).forEach(campo => {
    tabela += `<th>${campo}</th>`;
  });
  tabela += '</tr></thead>';

  tabela += '<tbody>';
  relatorio.forEach(item => {
    tabela += '<tr>';
    Object.values(item).forEach(valor => {
      tabela += `<td>${valor === null ? '' : valor}</td>`;
    });
    tabela += '</tr>';
  });
  tabela += '</tbody></table>';

  return tabela;
}

const formMesa = document.getElementById('formRelatorioMesa');
const resultadoMesa = document.getElementById('resultadoRelatorioMesa');

formMesa.addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = new FormData(formMesa);
  const mesa = dados.get('mesa');

  try {
    const res = await fetch(`/api/gerente/relatorios/mesa/${mesa}`);
    if (!res.ok) throw new Error('Erro ao gerar relatório por mesa');
    const data = await res.json();

    resultadoMesa.innerHTML = criarTabela(data);
  } catch (err) {
    alert('Erro ao gerar relatório por mesa');
    console.error(err);
  }
});

// Parte dos Garçons
const selectGarcom = document.getElementById('selectGarcom');
const formRelatorioGarcom = document.getElementById('formRelatorioGarcom');
const resultadoRelatorioGarcom = document.getElementById('resultadoRelatorioGarcom');

// Carregar garçons no select ao carregar a página
async function carregarGarcons() {
  try {
    const res = await fetch('/api/gerente/garcons');
    if (!res.ok) throw new Error('Erro ao carregar garçons');
    const garcons = await res.json();

    garcons.forEach(g => {
      const option = document.createElement('option');
      option.value = g.id;
      option.textContent = g.nome;
      selectGarcom.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

carregarGarcons();

// Ao enviar o formulário do relatório por garçom
formRelatorioGarcom.addEventListener('submit', async (e) => {
  e.preventDefault();

  const garcomId = selectGarcom.value;
  if (!garcomId) {
    alert('Selecione um garçom');
    return;
  }

  try {
    const res = await fetch(`/api/gerente/relatorio/garcom/${garcomId}`);
    if (!res.ok) throw new Error('Erro ao gerar relatório por garçom');
    const data = await res.json();

    resultadoRelatorioGarcom.innerHTML = criarTabela(data);
  } catch (err) {
    alert(err.message);
    console.error(err);
  }
});
