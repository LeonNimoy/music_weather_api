export class NotFoundError extends Error {
  constructor () {
    super()
    this.name = 'Not Found'
    this.message = 'Não foi possível localizar a cidade ou coordenada geográfica informada. Por favor, verifique os dados informados, bem como a documentação do Open Weather(https://openweathermap.org/current) para maiores informações.'
  }
}
