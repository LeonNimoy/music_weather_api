import { HttpResponse } from './http'

export interface Controller {
  handleCity: (httpRequestCity: any) => Promise<HttpResponse>
  handleGeographicalCoordinates: (httpRequestLat: any, httpRequestLong: any) => Promise<HttpResponse>
}
