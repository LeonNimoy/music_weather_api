export interface MusicProvider {
  load: (temperature: number) => string[]
}
