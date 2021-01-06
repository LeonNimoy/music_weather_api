import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-erro'
import { badRequest } from '../helpers/http-helper'
import { WeatherProvider } from '../protocols/weather-provider'
import { ServerError } from '../errors/server-error'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider

  constructor (weatherProvider: WeatherProvider) {
    this.weatherProvider = weatherProvider
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.param.city_name) {
        return badRequest(new MissingParamError('city_name'))
      }

      this.weatherProvider.load(httpRequest.param.city_name)
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
