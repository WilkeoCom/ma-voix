const Status = require('http-status')
const { Router } = require('express')

module.exports = ({
  postUseCase,
  logger,
  auth,
  response: { Success, Fail }
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   vote:
 *     properties:
 *       projectId:
 *         type: string
 *         format: uuid
 *       userId:
 *         type: string
 *         format: uuid
 *       choice:
 *         type: string
 */

  router.use(auth.authenticate())

  /**
 * @swagger
 * /votes:
 *   post:
 *     tags:
 *       - Votes
 *     description: Create new vote
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Vote's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/vote'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/vote'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      postUseCase
        .create({ body: req.body })
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
