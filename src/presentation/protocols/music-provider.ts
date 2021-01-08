export interface MusicProvider {
  load: (playlistGenre: string) => Promise<string[]>
}
