const t = require('tcomb')
const { compose } = require('ramda')

const { cleanData } = require('../helper')

const Project = t.struct({
  id: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  projectType: t.String,
  status: t.String,
  title: t.String,
  topics: t.maybe(t.Array),
  url: t.String
})

module.exports = compose(
  cleanData,
  Project
)
