import express from 'express'
import { getLocalidades, getProvincias } from '../service/provincia/provincia.service';


export const getAllProv = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const provincias = await getProvincias()
        return res.status(200).send(provincias); 
      } catch (e) {
        next(e)
      }
  };

export const getLocalidadesByProv = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const provincias = await getLocalidades(parseInt(req.params.provincia))
        return res.status(200).send(provincias); 
      } catch (e) {
        next(e)
      }
  };