import { Controller, HttpResponse, WeatherProvider } from './load-playlist-protocols'
import { ok } from '../../helpers/http-helper'
import { LoadPlaylist } from '../../../domain/usecases/load-playlist'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider
  private readonly musicProviderService: LoadPlaylist

  constructor (weatherProvider: WeatherProvider, musicProviderService: LoadPlaylist) {
    this.weatherProvider = weatherProvider
    this.musicProviderService = musicProviderService
  }

  async handleCity (city: string): Promise<HttpResponse> {
    const cityTemperature = await this.weatherProvider.loadUsingCity(city)

    if (cityTemperature.statusCode === 400 || cityTemperature.statusCode === 404) {
      return cityTemperature
    }

    const playlist = await this.musicProviderService.loadPlaylist(cityTemperature)

    return ok(playlist)
  }

  async handleGeographicalCoordinates (lat: string, long: string): Promise<HttpResponse> {
    const geographicalCoordinatesTemperature = await this.weatherProvider.loadUsingGeographicalCoordinates(lat, long)

    if (geographicalCoordinatesTemperature.statusCode === 400 || geographicalCoordinatesTemperature.statusCode === 404) {
      return geographicalCoordinatesTemperature
    }

    const playlist = await this.musicProviderService.loadPlaylist(geographicalCoordinatesTemperature)

    return ok(playlist)
  }
}
