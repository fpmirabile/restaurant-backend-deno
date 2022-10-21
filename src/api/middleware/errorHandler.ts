import express from 'express'
import { BaseError } from '../../error/base.error'

export const errorHandler = [
  async (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {

    if(err instanceof BaseError){
      console.log(err)
      res.status(err.status).send({message: err.message})
    }else{
      console.log(err)
      res.status(500).send({message: "Ocurrio un error inesperado"})
    }    

  },
]