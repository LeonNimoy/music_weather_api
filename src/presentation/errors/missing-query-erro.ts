export class MissingQueryError extends Error {
  constructor (queryName: string) {
    super(`Missing Query: ${queryName}`)
    this.name = 'MissingQueryError'
  }
}
