export class InvalidParamError extends Error {
  constructor () {
    super()
    this.name = 'Invalid Param Error'
    this.message = 'Por favor, informe uma cidade ou coordenadas geográficas válidas.'
  }
}
