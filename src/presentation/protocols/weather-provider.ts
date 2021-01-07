export interface WeatherProvider {
  loadUsingCity: (city: string) => Promise<number>
  loadUsingGeographicalCoordinates: (lat: string, long: string) => Promise<number>
}
