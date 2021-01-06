export interface WeatherProvider {
  load: (city: string) => number
}
