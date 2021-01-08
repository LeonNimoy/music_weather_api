import { LoadPlaylist } from '../../domain/usecases/load-playlist'
import { Playlist } from '../../domain/models/playlist'

export class MusicProviderService implements LoadPlaylist {
  public async loadPlaylist (temperature: number): Promise<Playlist> {
    return ['any_music']
  }
}
