const Project = require('./projectInMemory')
const User = require('./userInMemory')

module.exports = ({ database }) => {
  const userModel = database.models.users

  return {
    projectRepository: Project({}),
    userRepository: User({ model: userModel })
  }
}
