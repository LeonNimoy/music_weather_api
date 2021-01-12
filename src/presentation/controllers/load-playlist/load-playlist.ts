import { Controller, HttpResponse, WeatherProvider } from './load-playlist-protocols'
import { MissingQueryError } from '../../errors'
import { serverError, badRequest, ok } from '../../helpers/http-helper'
import { LoadPlaylist } from '../../../domain/usecases/load-playlist'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider
  private readonly musicProviderService: LoadPlaylist

  constructor (weatherProvider: WeatherProvider, musicProviderService: LoadPlaylist) {
    this.weatherProvider = weatherProvider
    this.musicProviderService = musicProviderService
  }

  async handleCity (city: string): Promise<HttpResponse> {
    try {
      if (!city) {
        return badRequest(new MissingQueryError())
      }

      const cityWeather = await this.weatherProvider.loadUsingCity(city)
      const playlist = await this.musicProviderService.loadPlaylist(cityWeather)
      return ok(playlist)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }

  async handleGeographicalCoordinates (lat: string, long: string): Promise<HttpResponse> {
    try {
      if (!lat && !long) {
        return badRequest(new MissingQueryError())
      }

      const geographicalCoordinatesTemperature = await this.weatherProvider.loadUsingGeographicalCoordinates(lat, long)
      const playlist = await this.musicProviderService.loadPlaylist(geographicalCoordinatesTemperature)
      return ok(playlist)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
