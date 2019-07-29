const t = require('tcomb')

const VoteChoice = t.enums({
  AGAINST: 'against',
  FOR: 'for'
}, 'VoteChoice')

module.exports = VoteChoice
