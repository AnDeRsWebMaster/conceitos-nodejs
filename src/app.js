const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title, url, techs,
    likes: 0
  }
  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { url, title, techs } = request.body


  if (!isUuid(id))
    return response.status(400).json({ erro: "repositorio naão é valido!" })

  let repository = repositories.find(repository => repository.id === id)

  if (!repository)
    return response.status(400).json({ erro: "não encontrado!!!" })

  let likes = repository.likes

  repository = { id, url, title, techs, likes }
  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repository = repositories.findIndex(repository => repository.id === id)

  if (repository < 0)
    return response.status(400).json({ erro: "não encontrado!!!" })

  repositories.splice(repository, 1)
  return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repository = repositories.find(repository => repository.id === id)

  if (!repository)
    return response.status(400).send()

  repository.likes += 1
  return response.json(repository)
});

module.exports = app;
