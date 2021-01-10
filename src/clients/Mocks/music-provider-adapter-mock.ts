import musicService from '../../../music-service-mock.json'
import { MusicProvider } from '../../presentation/protocols/music-provider'

export class MusicProviderAdapterMock implements MusicProvider {
  public async load (playlistGenre: string): Promise<string[]> {
    if (playlistGenre === 'party') {
      return musicService.party
    } else if (playlistGenre === 'pop') {
      return musicService.pop
    } else if (playlistGenre === 'rock') {
      return musicService.rock
    } else if (playlistGenre === 'classical') {
      return musicService.classical
    }
  }
}
