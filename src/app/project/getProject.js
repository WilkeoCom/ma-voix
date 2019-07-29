/**
  * function for getter project.
  */
module.exports = ({ projectRepository }) => {
  // code for getting the item
  const get = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        projectRepository.findById(id)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    get
  }
}
