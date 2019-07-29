const { toEntity } = require('./transform')
const { comparePassword, encryptPassword } = require('../../encryption')
const fakeUsers = require('../../support/fakers/development/users')

module.exports = ({ model }) => {
  const users = [
    {
      dataValues: { ...fakeUsers()[0] }
    }
  ]

  const getAll = (...args) =>
    users.map(({ dataValues }) => {
      return toEntity(dataValues)
    })

  const create = (...args) => {
    return new Promise(async resolve => {
      const user = args[0]
      user.password = encryptPassword(user.password)
      users.push({ dataValues: user })

      resolve(user)
    })
  }

  const update = (...args) => {
    const updatedFields = args[0]
    const { where } = args[1]
    const user = users.find(u => u.dataValues.id === where.id)

    if (!user) {
      return false
    }

    user.dataValues = { ...user.dataValues, ...updatedFields }

    return true
  }

  const findById = (...args) => {
    return new Promise(async (resolve, reject) => {
      const id = args[0]
      const user = users.find(u => u.dataValues.id === id)

      if (!user) {
        reject(new Error('User not found'))
      } else {
        resolve(toEntity(user.dataValues))
      }
    })
  }

  const findOne = (...args) => {
    const { where } = args[0]
    const { email, isDeleted } = where
    const user = users.find(
      u => u.dataValues.email === email && u.dataValues.isDeleted === isDeleted
    )

    if (!user) {
      return null
    }

    return toEntity(user.dataValues)
  }

  const validatePassword = endcodedPassword => password =>
    comparePassword(password, endcodedPassword)

  const destroy = (...args) => {
    return new Promise(async resolve => {
      const { where } = args[0]
      if (where.id) {
        const index = users.findIndex(u => u.dataValues.id === where.id)
        users.splice(index, 1)
      } else {
        users.splice(0, users.length)
      }

      resolve()
    })
  }

  return {
    getAll,
    create,
    update,
    findById,
    findOne,
    validatePassword,
    destroy
  }
}
