/* eslint-env mocha */
const {
  projectRepository,
  userRepository
} = app.resolve('repository')

describe('Routes: POST Votes', () => {
  const BASE_URI = `/api/${config.version}`

  const signIn = app.resolve('jwt').signin()
  let token

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          id: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
          firstName: 'Test',
          lastName: 'Dev',
          middleName: 'Super Dev',
          email: 'testdev1@gmail.com',
          password: 'pass',
          roleId: 1,
          isDeleted: 0,
          createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'
        })
      ).then((user) => {
        token = signIn({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email
        })
        done()
      })

    // we need to add project before we can vote
    projectRepository
      .destroy({ where: {} })
      .then(() =>
        projectRepository.create({
          id: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
          createdAt: new Date('2018-12-05'),
          projectType: 'projet de loi',
          status: 'Première lecture (Sénat)',
          title: 'projet de loi pour une école de la confiance',
          topics: ['CULTURE', 'EDUCATION', 'SOCIETY'],
          url: 'http://www.senat.fr/dossier-legislatif/pjl18-323.html'
        })
      )
  })

  describe('Should post votes', () => {
    it('should return create vote', (done) => {
      request.post(`${BASE_URI}/votes`)
        .set('Authorization', `JWT ${token}`)
        .send({
          projectId: '58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
          userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
          choice: 'FOR'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.projectId).to.eql('58e40a9c-c5e9-4d63-9aba-b77cdf4ca67b')
          expect(res.body.data.userId).to.eql('48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b')
          expect(res.body.data.choice).to.eql('FOR')
          done(err)
        })
    })

    it('should validate vote object is not complete', (done) => {
      request.post(`${BASE_URI}/votes`)
        .set('Authorization', `JWT ${token}`)
        .send({
          userId: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b',
          choice: 'FOR'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      request.post(`${BASE_URI}/votes`)
        .expect(401)
        .end((err, res) => {
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })
  })
})
