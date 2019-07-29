const t = require('tcomb')
const { compose } = require('ramda')

const { cleanData } = require('../helper')

const VoteResults = t.struct({
  projectId: t.String,
  against: t.Integer,
  for: t.Integer
})

module.exports = compose(
  cleanData,
  VoteResults
)
