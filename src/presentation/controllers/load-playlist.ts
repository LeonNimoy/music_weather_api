import { HttpRequest, HttpResponse } from '../protocols/http'

export class LoadPlayListController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.params.city_name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: city_name')
      }
    }
  }
}
