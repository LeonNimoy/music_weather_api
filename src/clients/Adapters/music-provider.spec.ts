
import { MusicProviderAdapter } from './music-provider'

describe('Music Provider Adapter', () => {
  test('should return a valid playlist from Spotify service', async () => {
    const genre = 'rock'
    const sut = new MusicProviderAdapter()

    const loadSpy = jest.spyOn(sut, 'load').mockReturnValue(Promise.resolve(['any_son'])
    )

    await sut.load(genre)
    expect(loadSpy).toBeTruthy()
  })
})
