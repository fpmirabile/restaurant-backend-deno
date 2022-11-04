import express from 'express'

export const setResponse = (res: express.Response, status:number, body:any) => {
    (res as any).response = {body: body, status: status};
}