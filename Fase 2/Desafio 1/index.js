const express = require('express');

const server = express();

server.use(express.json());

server.listen(3000);

const projects = [];
var idProjectAutoInc = 1;

server.use((req, res, next) => {
  console.count('Total de requisições');

  next();
});

function checkIdProject(req, res, next) {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({error: 'O parametro: id é requerido nos parametros da requisição.'})
  }

  const index = projects.findIndex(p => p.id == id);

  if (index < 0) {
    return res.status(400).send({error: `Projeto com id: ${id} não existe.`});
  }

  req.index = index;

  next();
};

function checkTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(400).send({error: 'A propriedade: title é requerida no corpo da requisição.'})
  }

  next();
};

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', checkTitle, (req, res) => {
  const { title } = req.body;

  const project = {
    id: idProjectAutoInc++,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.put('/projects/:id', checkTitle, checkIdProject, (req, res) => {
  const { title } = req.body;

  project = projects[req.index];

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIdProject, (req, res) => {
  projects.splice(req.index, 1);

  return res.send();
});

server.post('/projects/:id/tasks', checkTitle, checkIdProject, (req, res) => {
  const { title } = req.body;

  const project = projects[req.index];

  project.tasks.push(title);

  return res.json(project);
});