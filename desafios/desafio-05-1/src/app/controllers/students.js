const { age, date, grade } = require('../../lib/utils');

module.exports = {
  index(req, res) {
    return res.render('students/index', { students: data.students });
  },
  create(req, res) {
    return res.render('students/create');
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') return res.send('Please, fill all fields!');
    }

    let { avatar_url, name, email, birth, schoolYear, workload } = req.body;

    birth = Date.parse(birth);
    
    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
      id = lastStudent.id + 1;
    }

    data.students.push({
      id,
      avatar_url,
      name,
      email,
      birth,
      schoolYear,
      workload,
    });

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error!');

      return res.redirect('/students');
    });
  },
  show(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function (student) {
      return student.id == id;
    });

    if (!foundStudent) return res.send('Student not found');
    
    const student = {
      ...foundStudent,
      age: age(foundStudent.birth),
      birth: date(foundStudent.birth).birthday,
      schoolYear: grade(foundStudent.schoolYear),
    };

    return res.render('students/show', { student });
  },
  edit(req, res) {
    const { id } = req.params;

    const foundStudent = data.students.find(function (student) {
      return student.id == id;
    });

    if (!foundStudent) return res.send('Student not found');

    const student = {
      ...foundStudent,
      birth: date(foundStudent.birth).iso,
    };

    return res.render('students/edit', { student });
  },
  update(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundStudent = data.students.find(function (student, foundIndex) {
      if (id == student.id) {
        index = foundIndex;
        return true;
      }
    });

    if (!foundStudent) return res.send('Student not found');

    const student = {
      ...foundStudent,
      ...req.body,
      birth: Date.parse(req.body.birth),
      id: Number(req.body.id),
    };

    data.students[index] = student;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write error!');
    })

    return res.redirect(`/students/${id}`);
  },
  delete(req, res) {
    const { id } = req.body;

    const filteredStudents = data.students.filter(function (student) {
      return student.id != id;
    });

    data.students = filteredStudents;

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send('Write file error!');

      return res.redirect('/students');
    });
  },
};
