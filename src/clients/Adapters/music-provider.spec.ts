
import { MusicProviderAdapter } from './music-provider'

describe('Music Provider Adapter', () => {
  test('should return a valid playlist from Spotify service', async () => {
    const genre = 'rock'
    const sut = new MusicProviderAdapter()

    const playlist = await sut.load(genre)
    expect(playlist).toHaveProperty('items')
  })
})
