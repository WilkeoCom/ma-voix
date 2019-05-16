const Status = require('http-status')
const { Router } = require('express')

module.exports = ({
  getUseCase,
  logger,
  auth,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       title:
 *         type: string
 *       url:
 *         type: string
 *       status:
 *         type: string
 *       projectType:
 *         type: string
 *       topics:
 *         type: number
 */

  router.use(auth.authenticate())

  /**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns a list of projects
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: An array of projects
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/project'
 *       401:
 *        $ref: '#/responses/Unauthorized'
 */
  router
    .get('/', (req, res) => {
      getUseCase
        .all(req, res)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  return router
}
