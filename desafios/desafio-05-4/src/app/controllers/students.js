const { age, date, grade } = require('../../lib/utils');
const Student = require('../models/Student');

module.exports = {
  index(req, res) {
    let { filter, page = 1, limit = 5 } = req.query;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: students.length > 0 ? Math.ceil(students[0].total / limit) : 0,
          page,
        };

        return res.render('students/index', { students, pagination, filter });
      },
    };

    Student.paginate(params);
  },
  create(req, res) {
    Student.teachersSelectOptions(function (teachers) {
      return res.render('students/create', { teachers });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') return res.send('Please, fill all fields!');
    }

    Student.create(req.body, function (student) {
      return res.redirect(`/students/${student.id}`);
    });
  },
  show(req, res) {
    Student.find(req.params.id, function (student) {

      student.birth = date(student.birth).birthday;
      student.school_year = grade(student.school_year);

      return res.render('students/show', { student });
    });
  },
  edit(req, res) {
    Student.find(req.params.id, function(student) {
      if (!student) return res.send('Student not found!');

      student.birth = date(student.birth).iso;

      Student.teachersSelectOptions(function (teachers) {
        return res.render('students/edit', { student, teachers });
      });
    });
  },
  update(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == '') return res.send('Please, fill all fields!');
    }

    Student.update(req.body, function () {
      return res.redirect(`/students/${req.body.id}`);
    });
  },
  delete(req, res) {
    Student.delete(req.body.id, function () {
      return res.redirect('/students');
    });
  },
};
