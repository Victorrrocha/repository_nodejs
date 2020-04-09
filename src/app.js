const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body
  const id = uuid()

  repositories.push({
    id,
    title,
    url,
    techs,
    likes
  })

  return response.json(repositories)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const indexOfRepo = repositories.findIndex(repo => repo.id === id)

  if( indexOfRepo < 0)
    return response.status(400)

  const oldLikes = repositories[indexOfRepo].likes

  const newRepo = {
    id,
    title,
    url,
    techs,
    likes: oldLikes
  }
  repositories[indexOfRepo] = newRepo
  return response.json(repositories)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const indexOfRepo = repositories.findIndex(repo => repo.id === id)

  if( indexOfRepo < 0)
    return response.status(400)
  
  repositories.splice(indexOfRepo, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params
  const indexOfRepo = repositories.findIndex(repo => repo.id === id)

  if( indexOfRepo < 0)
    return response.status(400)

  repositories[indexOfRepo].likes += 1
  return response.json(repositories[indexOfRepo])
});

module.exports = app;
