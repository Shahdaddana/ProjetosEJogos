const entradaArquivo1 = document.getElementById('entradaArquivo1');
const entradaArquivo2 = document.getElementById('entradaArquivo2');

document.getElementById('file-name-1').textContent = "Nenhum arquivo selecionado";
document.getElementById('file-name-2').textContent = "Nenhum arquivo selecionado";

let csv1 = "";
let csv2 = "";
let cabecalho1 = [];
let cabecalho2 = [];
let chave = [];

// Corrigindo event listener duplicado
entradaArquivo1.addEventListener('change', function() {
  handleFileSelect(this, 'card1'); // Passando o elemento de entrada como argumento
  lerCSV(this, (conteudo) => {
    csv1 = conteudo;
    verificarInputsCSV();
  });
});

entradaArquivo2.addEventListener('change', function() {
  handleFileSelect(this, 'card2'); // Passando o elemento de entrada como argumento
  lerCSV(this, (conteudo) => {
    csv2 = conteudo;
    verificarInputsCSV();
  });
});

function lerCSV(input, callback) {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const conteudo = e.target.result;
    callback(conteudo);
  };

  reader.readAsText(file);
}

function determinarCabecalho(csv) {
  return csv.trim().split('\n')[0].split(',').map(coluna => coluna.trim());
}

function encontrarRepetidos(array1, array2) {
  return array1.filter(elemento => array2.includes(elemento));
}

function verificarInputsCSV() {
  if (csv1 && csv2) {
    cabecalho1 = determinarCabecalho(csv1);
    cabecalho2 = determinarCabecalho(csv2);

    chave = encontrarRepetidos(cabecalho1, cabecalho2);
    if (chave.length === 0) {
      alert('Nenhuma chave comum encontrada');
      csv1 = "";
      csv2 = "";
      entradaArquivo1.value = null;
      entradaArquivo2.value = null;
      document.getElementById('file-name-1').textContent = "Nenhum arquivo selecionado";
      document.getElementById('file-name-2').textContent = "Nenhum arquivo selecionado";
      document.getElementById('card1').classList.remove('uploaded');
      document.getElementById('card2').classList.remove('uploaded');
      return;
    }

    const tabelaFinal = unirTabelas(csv1, csv2, chave[0]);
    downloadCSV(tabelaFinal);
  }
}

function unirTabelas(csv1, csv2, chave) {
  const tabela1 = csvParaObjeto(csv1, cabecalho1);
  const tabela2 = csvParaObjeto(csv2, cabecalho2);

  const mapaTabela2 = new Map();
  tabela2.forEach((linha) => {
    const chaveValor = linha[chave];
    if (!mapaTabela2.has(chaveValor)) {
      mapaTabela2.set(chaveValor, []);
    }
    mapaTabela2.get(chaveValor).push(linha);
  });

  const tabelaFinal = tabela1.map((linha) => {
    const chaveValor = linha[chave];
    if (mapaTabela2.has(chaveValor)) {
      const linhasTabela2 = mapaTabela2.get(chaveValor);
      return Object.assign({}, linha, ...linhasTabela2);
    } else {
      return null;
    }
  }).filter((linha) => linha !== null);

  return tabelaFinal;
}

function csvParaObjeto(csv, cabecalho) {
  const linhas = csv.trim().split('\n').slice(1);
  return linhas.map((linha) => {
    const valores = linha.split(',').map(coluna => coluna.trim());
    return cabecalho.reduce((obj, coluna, index) => {
      obj[coluna] = valores[index];
      return obj;
    }, {});
  });
}

function objetoParaCSV(objArray) {
  const cabecalhos = Object.keys(objArray[0]);
  const csvLinhas = objArray.map(obj =>
    cabecalhos.map(campo => JSON.stringify(obj[campo] || '')).join(',')
  );
  return [cabecalhos.join(','), ...csvLinhas].join('\n');
}

function downloadCSV(tabelaFinal) {
  const csvContent = objetoParaCSV(tabelaFinal);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resultado.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function handleFileSelect(input, cardId) {
  const fileName = input.files[0].name;
  const fileId = input.getAttribute('id');
  const fileNameElement = document.getElementById('file-name-' + fileId.slice(-1));
  fileNameElement.textContent = fileName;
  document.getElementById(cardId).classList.add('uploaded');
}
