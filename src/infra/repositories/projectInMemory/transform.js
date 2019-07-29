const { Project } = require('src/domain/project')

const toEntity = Project

/*
const toEntity = data => {
  const topics = data.topics
   .split(',')
   .map(t => t.trim())

  return new Project({ ...data, topics })
}
*/

module.exports = {
  toEntity
}
