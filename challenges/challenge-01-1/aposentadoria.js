const nome = 'Bruno';
const sexo = 'Masculino';
const idade = 23;
const contribuicao = 3;

console.log('\n');
console.log('==== Cálculo de Aposentadoria ====');

if (sexo === 'Masculino') {
  let soma = idade + contribuicao;

  if (soma >= 95) console.log(`${nome}, você pode se aposentar`);
  else console.log(`${nome}, você ainda não pode se aposentar`);
} else {
  let soma = idade + contribuicao;

  if (soma >= 85) console.log(`${nome}, você pode se aposentar`);
  else console.log(`${nome}, você ainda não pode se aposentar`);
}
