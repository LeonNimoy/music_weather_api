export interface WeatherProvider {
  load: (city: string) => Promise<number>
}
