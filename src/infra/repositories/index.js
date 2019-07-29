const Project = require('./projectInMemory')
const User = require('./userInMemory')
const Vote = require('./voteInMemory')

module.exports = ({ database }) => {
  const userModel = database.models.users

  return {
    projectRepository: Project({}),
    userRepository: User({ model: userModel }),
    voteRepository: Vote({})
  }
}
