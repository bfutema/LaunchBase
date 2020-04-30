const usuarios = [
  { nome: "Carlos", tecnologias: ["HTML", "CSS"] },
  { nome: "Jasmine", tecnologias: ["JavaScript", "CSS"] },
  { nome: "Tuane", tecnologias: ["HTML", "Node.js"] }
];

console.log('==== Busca por Tecnologia ====');
console.log('\n');

function checaSeUsuarioUsaCss(usuario) {
  for (let tech of usuario.tecnologias) {
    if (tech.toUpperCase() == 'CSS') return true;
  }
}

for (let usuario of usuarios) {
  if (checaSeUsuarioUsaCss(usuario)) console.log(`O usuário ${usuario.nome} trabalha com CSS`);
}