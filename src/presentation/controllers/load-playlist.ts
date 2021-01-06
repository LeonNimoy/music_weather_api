import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-erro'

export class LoadPlayListController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.param.city_name) {
      return {
        statusCode: 400,
        body: new MissingParamError('city_name')
      }
    }
  }
}
