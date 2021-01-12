
import { MusicProviderAdapterMock } from '../../../clients/Mocks/music-provider-adapter-mock'
import { MusicProviderService } from '../../../presentation/services/music-provider'

export const makeMusicProviderService = (): MusicProviderService => {
  const controller = new MusicProviderService(new MusicProviderAdapterMock())

  return controller
}
