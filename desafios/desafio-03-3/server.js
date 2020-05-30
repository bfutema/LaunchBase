const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const courses = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get('/about', function (req, res) {
  const about = {
    avatar_url: 'https://avatars0.githubusercontent.com/u/28929274?s=200&v=4',
    name: 'Rocketseat',
    description: 'Plataforma de educação em tecnologia 🚀',
    techs: ['HTML5', 'CSS3'],
    links: [
      { name: 'Github', url: 'https://github.com/BrunoFutema/', class: 'github' },
      // { name: 'Twitter', url: 'https://twitter.com/rocketseat', class: 'tweet' },
      { name: 'Instagram', url: 'https://www.instagram.com/rocketseat_oficial/', class: 'insta' },
      { name: 'Facebook', url: 'https://www.facebook.com/rocketseat/', class: 'fb' },
    ],
  };

  return res.render('about', { about });
});

server.get('/courses', function (req, res) {
  return res.render('courses', { courses });
});

server.get('/courses/:id', function (req, res) {
  const { id } = req.params;
  const course = courses.find(function(course) { return course.id == id });

  if (!course) return res.status(404).render('not-found');

  return res.render('course', { course });
});

server.use(function (req, res) {
  return res.status(404).render('not-found');
});

server.listen(5000, function () {
  console.log('Server is running');
});
