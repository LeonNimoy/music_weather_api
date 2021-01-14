import { Request, Response } from 'express'

import { Controller, HttpResponse } from '../../presentation/protocols'
import { MissingQueryError } from '../../presentation/errors/missing-query-error'
import { badRequest, serverError } from '../../presentation/helpers/http-helper'

export class RouteControllerAdapter {
  public async adapt (controller: Controller, req: Request, res: Response): Promise<Response> {
    const { city, lat, long } = req.query

    if (!(city) && !(lat && long)) {
      return res.status(badRequest(new MissingQueryError()).statusCode).json(badRequest(new MissingQueryError()).body)
    }

    let httpResponse: HttpResponse

    if (city) {
      try {
        httpResponse = await controller.handleCity(city)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      } catch (error) {
        return res.status(serverError().statusCode).json(serverError().body)
      }
    } else if (lat && long) {
      try {
        httpResponse = await controller.handleGeographicalCoordinates(lat, long)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
      } catch (error) {
        return res.status(serverError().statusCode).json(serverError().body)
      }
    }
  }
}
