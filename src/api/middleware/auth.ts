import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import { jwtSecret } from '../../service/jwt/JwtService'
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned'
import { getUserById } from '../../service/user/user.service'
import { PermissionError } from '../../error/auth/PermissionError'

export const validateLogin = [
  body('usuario').notEmpty(),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })
    next()
  },
]

export const authenticated = [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await verifyJWT(req, res, next, null)
  }
]

export const authenticatedPartner= [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await verifyJWT(req, res, next, "PARTNER")
  }
]

export const authenticatedClient= [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await verifyJWT(req, res, next, "CLIENT")
  }
]

const verifyJWT= 
    async (
      req,
      res,
      next, 
      role
    ) => {
      if (!jwtSecret) {
        return res.send()
      }

      const token = req.headers['authorization']
      if (!token) {
        console.log('invalid token', token)
        return res
          .status(401)
          .send({ auth: false, message: 'No token provided.' })
      }

      jwt.verify(token, jwtSecret, async (err) => {
        if (err) {
          console.log('error token', err)
          return res
            .status(500)
            .send({ auth: false, message: 'Failed to authenticate token.' })
        }

        try {
          const userToken = jwt.decode(token) as IJwtUnsigned
          const user = await getUserById(userToken.userId)
          ;(req as any).user = user
          if(role != null && role != undefined && user.role != role){
            console.log("Permisos Insuficientes")
            throw new PermissionError();
          }
          next()
        } catch (e) {
          console.log("couldn't decode jwt")
          return res.status(500).send({ message: e })
        }
      })
    }
