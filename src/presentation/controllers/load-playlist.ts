export class LoadPlayListController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: city_name')
    }
  }
}