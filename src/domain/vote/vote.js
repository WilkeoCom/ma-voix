const t = require('tcomb')
const { compose } = require('ramda')

const VoteChoice = require('./voteChoice')
const { cleanData } = require('../helper')

const Vote = t.struct({
  projectId: t.String,
  userId: t.String,
  votedAt: t.Date,
  choice: VoteChoice
})

module.exports = compose(
  cleanData,
  Vote
)
