import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-erro'
import { badRequest } from '../helpers/http-helper'
export class LoadPlayListController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.param.city_name) {
      return badRequest(new MissingParamError('city_name'))
    }
  }
}
