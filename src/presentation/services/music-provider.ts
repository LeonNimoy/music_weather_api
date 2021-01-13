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
    } else if (temperature >= 15 && temperature <= 30) {
      const playlist = await this.musicProvider.load('pop')
      return playlist
    } else if (temperature >= 10 && temperature <= 14) {
      const playlist = await this.musicProvider.load('rock')
      return playlist
    } else if (temperature < 10) {
      const playlist = await this.musicProvider.load('classical')
      return playlist
    }
  }
}
