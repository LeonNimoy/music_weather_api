export class MissingQueryError extends Error {
  constructor () {
    super()
    this.name = 'Missing Query Error'
    this.message = 'Por favor, informe uma cidade ou coordenadas geográficas.'
  }
}
