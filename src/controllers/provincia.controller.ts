import express from 'express'
import { errorGenerated } from '../api/middleware/errorHandler';
import { getLocalidades, getProvincias } from '../service/provincia/provincia.service';
import { setResponse } from './response.controller';

export const getAllProv = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const provincias = await getProvincias()
        setResponse(res, 200, provincias)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const getLocalidadesByProv = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const provincias = await getLocalidades(parseInt(req.params.provincia))
        setResponse(res, 200, provincias)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };