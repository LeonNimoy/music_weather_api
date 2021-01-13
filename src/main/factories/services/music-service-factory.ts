
import { MusicProviderAdapter } from '../../../clients/Adapters/music-provider'
import { MusicProviderService } from '../../../presentation/services/music-provider'

export const makeMusicProviderService = (): MusicProviderService => {
  const musicProviderService = new MusicProviderService(new MusicProviderAdapter())

  return musicProviderService
}
