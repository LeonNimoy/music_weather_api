
import { Controller } from '../../../presentation/protocols/controller'
import { LoadPlayListController } from '../../../presentation/controllers/load-playlist/load-playlist'
import { WeatherProviderAdapterMock } from '../../../clients/Mocks/weather-provider-adapter-mock'
import { makeMusicProviderService } from '../services/music-service-factory'

export const makeLoadPlaylistController = (): Controller => {
  const controller = new LoadPlayListController(new WeatherProviderAdapterMock(), makeMusicProviderService())

  return controller
}
