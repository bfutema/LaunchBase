const nome = 'Bruno';
const peso = '55.5';
const altura = 1.69;
const sexo = 'Masculino';

const imc = peso / (altura * altura);

console.log('\n');
console.log('==== Cálculo de IMC ====');

if (imc >= 30) console.log(`${nome} você está acima do peso.`);
else console.log(`${nome} você não está acima do peso.`);
