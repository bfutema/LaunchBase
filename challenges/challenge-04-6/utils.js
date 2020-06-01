module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) age = age - 1;

    return age;
  },
  date: function (timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  },
  graduation: function (graduation) {
    if (graduation == 'medio') return 'Ensino Médio Completo';
    if (graduation == 'superior') return 'Ensino Superior Completo';
    if (graduation == 'mestrado') return 'Mestrado';
    if (graduation == 'doutorado') return 'Doutorado';
  },
  intl: function (timestamp) {
    const formatter = new Intl.DateTimeFormat('pt-BR');
    
    const day = `0${formatter.format(timestamp).split('-')[2]}`.slice(-2);
    const month = `0${formatter.format(timestamp).split('-')[1]}`.slice(-2);
    const year = formatter.format(timestamp).split('-')[0];

    return `${day}/${month}/${year}`;
  }
};
