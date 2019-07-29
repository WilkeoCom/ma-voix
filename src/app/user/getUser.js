/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting the item
  const get = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.findById(id)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    get
  }
}
