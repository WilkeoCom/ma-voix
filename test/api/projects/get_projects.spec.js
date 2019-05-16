/* eslint-env mocha */

const {
  projectRepository,
  userRepository
} = app.resolve('repository')

describe('Routes: GET Projects', () => {
  const BASE_URI = `/api/${config.version}`

  const signIn = app.resolve('jwt').signin()
  let token

  beforeEach((done) => {
    // we need to add user before we can request our token
    projectRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
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
  })

  describe('should return projects', () => {
    beforeEach((done) => {
      projectRepository
        .destroy({ where: {} })
        .then(() =>
          projectRepository.create({
            'createdAt': new Date('2018-11-26'),
            'projectType': 'projet de loi',
            'status': 'Première lecture (AN)',
            'title': 'projet de loi d\'orientation des mobilités',
            'topics': 'Transports',
            'url': 'http://www.senat.fr/dossier-legislatif/pjl18-157.html'
          })
        )
        .then(() => done())
    })

    it('should return all projects', (done) => {
      request.get(`${BASE_URI}/projects`)
        .set('Authorization', `JWT ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.length(1)
          done(err)
        })
    })

    it('should return unauthorized if no token', (done) => {
      request.get(`${BASE_URI}/projects`)
        .expect(401)
        .end((err, res) => {
          expect(res.text).to.equals('Unauthorized')
          done(err)
        })
    })
  })
})
