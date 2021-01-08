import { Playlist } from '../models/playlist'

export interface LoadPlaylist {
  loadPlaylist: (temperature: number) => Promise<Playlist>
}
