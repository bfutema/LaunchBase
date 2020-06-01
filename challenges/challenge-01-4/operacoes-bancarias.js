const user = {
  name: "Mariana",
  transactions: [],
  balance: 0
};

console.log('==== Operações bancárias ====');
console.log('\n');

function createTransaction(transaction) {
  if (transaction.type == 'credit') user.balance += transaction.value;
  else user.balance -= transaction.value;

  user.transactions.push(transaction);
}

function getHigherTransactionByType(type) {
  let maxTransaction;
  let maxValue = 0;

  for (let transaction of user.transactions) {
    if (transaction.type == type && transaction.value > maxValue) {
      maxValue = transaction.value;
      maxTransaction = transaction;
    }
  }

  return maxTransaction;
}

function getAverageTransactionValue() {
  let soma = 0;

  for (let transaction of user.transactions) soma += transaction.value;

  return soma / user.transactions.length;
}

function getTransactionsCount() {
  let count = {
    credit: 0,
    debit: 0,
  };

  for (let transaction of user.transactions) {
    if (transaction.type == 'credit') count.credit += 1;
    else count.debit += 1;
  }

  return count;
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance);

console.log(getHigherTransactionByType("credit"));
console.log(getHigherTransactionByType("debit"));

console.log(getAverageTransactionValue());

console.log(getTransactionsCount());
