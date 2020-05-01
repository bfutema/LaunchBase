const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get('/about', function(req, res) {
  const about = {
    avatar_url: '',
    name: 'Bruno Futema',
    role: 'Aluno - Rocketseat',
    description: 'Programador full-stack, focado em estudos com programação em javascript e .NET. Aluno da <a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>.',
    links: [
      { name: 'Github', url: 'https://github.com/BrunoFutema/' },
      { name: 'Twitter', url: 'https://twitter.com/BFutema' },
      { name: 'Linkedin', url: 'https://www.linkedin.com/in/brunofutema/' }
    ]
  };

  return res.render('about', { about });
});

server.get('/portfolio', function(req, res) {
  return res.render('portfolio', { videos });
});

server.get('/video', function(req, res) {
  const { id } = req.query;
  const video = videos.find(function(video) { return video.id == id });

  if (!video) return res.send('Vídeo not found!');

  return res.render('video', { video });
})

server.listen(5000, function () {
  console.log('server is running');
});