export interface MusicProvider {
  load: (temperature: number) => Promise<string[]>
}
