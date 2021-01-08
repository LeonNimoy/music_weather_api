
import { MusicProviderService } from './music-provider'

describe('Music Provider Service', () => {
  test('should return a party playlist, if the temperature is above 30° Celsius', async () => {
    const temperature = 31

    jest.spyOn(new MusicProviderService(), 'loadPlaylist').mockReturnValue(Promise.resolve(['party_song'])
    )

    const sut = new MusicProviderService()
    const playlist = await sut.loadPlaylist(temperature)
    expect(playlist).toEqual(['party_song'])
  })
})
