const express = require('express');
const routes = express.Router();

const inscructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');

routes.get('/', function (req, res) { return res.redirect('/instructors'); });

routes.get('/instructors', inscructors.index);
routes.get('/instructors/create', inscructors.create);
routes.get('/instructors/:id', inscructors.show);
routes.post('/instructors', inscructors.post);
routes.put('/instructors', inscructors.put);
routes.delete('/instructors', inscructors.delete);
routes.get('/instructors/:id/edit', inscructors.edit);

routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.get('/members/:id', members.show);
routes.post('/members', members.post);
routes.put('/members', members.put);
routes.delete('/members', members.delete);
routes.get('/members/:id/edit', members.edit);

module.exports = routes;
