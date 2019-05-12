
const container = require('src/container') // we have to get the DI
const { getAllUsers, createUser, updateUser, deleteUser } = require('src/app/user')

module.exports = () => {
  const { repository: {
    userRepository
  } } = container.cradle

  const getUseCase = getAllUsers({ userRepository })
  const postUseCase = createUser({ userRepository })
  const putUseCase = updateUser({ userRepository })
  const deleteUseCase = deleteUser({ userRepository })

  return {
    getUseCase,
    postUseCase,
    putUseCase,
    deleteUseCase
  }
}
