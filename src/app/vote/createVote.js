const { Vote } = require('src/domain/vote')
const { getProject } = require('src/app/project')
const { getUser } = require('src/app/user')
const getVote = require('src/app/vote/getVote')

/**
  * function for create vote.
  */
module.exports = ({ voteRepository, projectRepository, userRepository }) => {
  const isProjectExist = async (projectId) => {
    const project = await getProject({ projectRepository }).get({ id: projectId })

    return project !== undefined
  }

  const isUserExist = async (userId) => {
    const user = await getUser({ userRepository }).get({ id: userId })

    return user !== undefined
  }

  const hasAlreadyVoted = async (userId, projectId) => {
    const vote = await getVote({ voteRepository }).get({ userId, projectId })

    return vote != null
  }

  const create = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const vote = Vote({ ...body, votedAt: new Date() })

        if (!(await isProjectExist(vote.projectId))) {
          throw new Error('Invalid project')
        }

        if (!(await isUserExist(vote.userId))) {
          throw new Error('Invalid user')
        }

        if (await hasAlreadyVoted(vote.userId, vote.projectId)) {
          throw new Error('User has already voted')
        }

        const voteCreated = await voteRepository.create(vote)

        resolve(voteCreated)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    create
  }
}
