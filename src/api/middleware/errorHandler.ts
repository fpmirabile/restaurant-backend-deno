import express from 'express'
import { setResponse } from '../../controllers/response.controller'
import { BaseError } from '../../error/base.error'

export const errorHandler = [
  async (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if(err){
      let status = 500
      let response = {message: "Ocurrio un error inesperado"}
      if(err instanceof BaseError){
        status = err.status
        response = {message: err.message}
      }  
  
      console.log(err);
      setResponse(res, status, response)
    }     

    next()
  },
]

export const errorGenerated = (err,
  res: express.Response) => {
      let status = 500
      let response = {message: "Ocurrio un error inesperado"}
      if(err instanceof BaseError){
        status = err.status
        response = {message: err.message}
      }  
  
      console.log(err);
      setResponse(res, status, response)
}