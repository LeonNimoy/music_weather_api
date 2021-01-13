
import { Controller } from '../../../presentation/protocols/controller'
import { LoadPlayListController } from '../../../presentation/controllers/load-playlist/load-playlist'
import { WeatherProviderAdapter } from '../../../clients/Adapters/weather-provider'
import { makeMusicProviderService } from '../services/music-service-factory'

export const makeLoadPlaylistController = (): Controller => {
  const controller = new LoadPlayListController(new WeatherProviderAdapter(), makeMusicProviderService())

  return controller
}
