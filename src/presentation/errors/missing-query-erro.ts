export class MissingQueryError extends Error {
  constructor () {
    super('Missing city or Geographical coordinates')
    this.name = 'MissingQueryError'
  }
}
