const { VoteChoice, VoteResults } = require('src/domain/vote')

module.exports = ({ voteRepository }) => {
  const createVoteResults = (votes, projectId) => new VoteResults({
    projectId,
    // @todo beurk
    for: votes.filter(v => VoteChoice.meta.map[v.choice] === VoteChoice.meta.map.FOR).length,
    against: votes.filter(v => VoteChoice.meta.map[v.choice] === VoteChoice.meta.map.AGAINST).length
  })

  const all = ({ projectId }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const votes = await voteRepository.getAll({
          attributes: [
            'userId', 'projectId', 'choice', 'votedAt'
          ],
          where: {
            projectId
          }
        })

        resolve(createVoteResults(votes, projectId))
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    all
  }
}
