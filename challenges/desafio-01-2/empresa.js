const empresa = {
  nome: 'Rocketseat',
  cor: 'Roxo',
  foco: 'Programação',
  endereco: {
    rua: 'Rua Guilherme Gembala',
    numero: 260
  }
}

console.log('==== Construção e impressão de objetos ====');
console.log('\n');

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`);