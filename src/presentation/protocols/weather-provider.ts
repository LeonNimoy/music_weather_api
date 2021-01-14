export interface WeatherProvider {
  loadUsingCity: (city: string) => Promise<any>
  loadUsingGeographicalCoordinates: (lat: string, long: string) => Promise<any>
}
