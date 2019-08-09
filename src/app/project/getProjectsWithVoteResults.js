const getAllProjects = require('src/app/project/getAllProjects')
const getAllVotes = require('src/app/vote/getAllVotes')

/**
  * function for getter projects.
  */
module.exports = ({ voteRepository, projectRepository }) => {
  const createProjectWithVoteResults = async (project) => {
    const voteResults = await getAllVotes({ voteRepository }).all({ projectId: project.id })

    return ({
      ...project,
      for: voteResults.for,
      against: voteResults.against,
      forPercentage: voteResults.getForPercentage(),
      againstPercentage: voteResults.getAgainstPercentage()
    })
  }

  const all = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const projects = await getAllProjects({ projectRepository }).all()

        resolve(await Promise.all(projects.map(createProjectWithVoteResults)))
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    all
  }
}
