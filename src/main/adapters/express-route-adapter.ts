import { Request, Response } from 'express'

import { Controller, HttpResponse } from '../../presentation/protocols'

export class AdapterControllerRoute {
  public async adapt (controller: Controller, req: Request, res: Response): Promise<Response> {
    try {
      const { city, lat, long } = req.query

      let httpResponse: HttpResponse

      if (city) {
        httpResponse = await controller.handleCity(city)

        return res.status(httpResponse.statusCode).json(httpResponse.body)
      }

      if (lat && long) {
        httpResponse = await controller.handleGeographicalCoordinates(lat, long)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
