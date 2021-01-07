export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  param?: any
  body?: any
  query?: any
}
