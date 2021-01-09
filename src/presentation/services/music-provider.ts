import { LoadPlaylist } from '../../domain/usecases/load-playlist'
import { Playlist } from '../../domain/models/playlist'
import { MusicProvider } from '../protocols/music-provider'

export class MusicProviderService implements LoadPlaylist {
  constructor (private readonly musicProvider: MusicProvider) {
  }

  public async loadPlaylist (temperature: number): Promise<Playlist> {
    if (temperature > 30) {
      const playlist = await this.musicProvider.load('party')
      return playlist
    }
  }
}
