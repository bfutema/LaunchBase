const { age, date, graduation, intl } = require('../../lib/utils');

module.exports = {
  index(req, res) {
    return res.render('teachers/index');
  },
  create(req, res) {
    return res.render('teachers/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);
  
    for (key of keys) {
      if (req.body[key] == '') return res.send('Please, fill all fields!');
    }
  
    let { avatar_url, name, birth, graduation, typeClass, teaches } = req.body;
  
    birth = Date.parse(birth);
    const created_at = Date.now();
    
    let id = 1;
    const lastTeacher = data.teachers[data.teachers.length - 1];
  
    if (lastTeacher) {
      id = lastTeacher.id + 1;
    }
  
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
  },
  show(req, res) {
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
  },
  edit(req, res) {
    const { id } = req.params;
  
    const foundTeacher = data.teachers.find(function (teacher) {
      return teacher.id == id;
    });
  
    if (!foundTeacher) return res.send('Teacher not found');
  
    const teacher = {
      ...foundTeacher,
      birth: date(foundTeacher.birth).iso,
    };
  
    return res.render('teachers/edit', { teacher });
  },
  update(req, res) {
    const { id } = req.body;
    let index = 0;
  
    const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
      if (id == teacher.id) {
        index = foundIndex;
        return true;
      }
    });
  
    if (!foundTeacher) return res.send('Teacher not found');
  
    const teacher = {
      ...foundTeacher,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(req.body.id),
    };
  
    data.teachers[index] = teacher;
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write error!');
    })
  
    return res.redirect(`/teachers/${id}`);
  },
  delete(req, res) {
    const { id } = req.body;
  
    const filteredTeachers = data.teachers.filter(function (teacher) {
      return teacher.id != id;
    });
  
    data.teachers = filteredTeachers;
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error!');
  
      return res.redirect('/teachers');
    });
  }
};
