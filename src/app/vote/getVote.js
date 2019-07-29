/**
  * function for getter vote.
  */
module.exports = ({ voteRepository }) => {
  // code for getting the item
  const get = ({ userId, projectId }) => {
    return Promise
      .resolve()
      .then(() =>
        voteRepository.findOne({
          attributes: [
            'userId', 'projectId', 'choice', 'votedAt'
          ],
          where: {
            userId,
            projectId
          }
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    get
  }
}
