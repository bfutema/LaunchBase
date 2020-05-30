const fs = require('fs');
const data = require('./data.json');
const { age, date, graduation, intl } = require('./utils');

exports.show = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send('Teacher not found');
  
  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    graduation: graduation(foundTeacher.graduation),
    teaches: foundTeacher.teaches.split(','),
    created_at: intl(foundTeacher.created_at),
  };

  return res.render('teachers/show', { teacher });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') return res.send('Please, fill all fields!');
  }

  let { avatar_url, name, birth, graduation, typeClass, teaches } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    graduation,
    typeClass,
    teaches,
    created_at,
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error!');

    return res.redirect('/teachers');
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send('Teacher not found');

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth),
  };

  return res.render('teachers/edit', { teacher });
};
