const t = require('tcomb')
const { compose } = require('ramda')

const { cleanData } = require('../helper')

const VoteResults = t.struct({
  projectId: t.String,
  against: t.Integer,
  for: t.Integer
})

VoteResults.prototype.getVoteNumber = function () {
  return this.against + this.for
}

VoteResults.prototype.getForPercentage = function () {
  return Number((100 * this.for / this.getVoteNumber()).toFixed(2))
}

VoteResults.prototype.getAgainstPercentage = function () {
  return Number((100 * this.against / this.getVoteNumber()).toFixed(2))
}

module.exports = compose(
  cleanData,
  VoteResults
)
