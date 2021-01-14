export class ServerError extends Error {
  constructor () {
    super()
    this.name = 'Server Error'
    this.message = 'Ocorreu algum problema interno. Por favor, tente mais tarde.'
  }
}
