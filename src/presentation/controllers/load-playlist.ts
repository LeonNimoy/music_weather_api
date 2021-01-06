import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { WeatherProvider } from '../protocols/weather-provider'

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
      return serverError()
    }
  }
}
