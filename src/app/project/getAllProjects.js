/**
  * function for getter projects.
  */
module.exports = ({ projectRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        projectRepository.getAll({
          attributes: [
            'id', 'projectType', 'status', 'title', 'topics', 'url', 'createdBy'
          ]
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
