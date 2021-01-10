
import { MusicProviderAdapterMock } from './music-provider-adapter-mock'

describe('Music Provider Adapter Mock', () => {
  test('should return a party playlist, if playlistGenre is equal party', async () => {
    const genre = 'party'
    const sut = new MusicProviderAdapterMock()
    const playlist = await sut.load(genre)
    expect(playlist).toEqual(['party_song1', 'party_song2', 'party_song3'])
  })

  test('should return a pop playlist, if playlistGenre is equal pop', async () => {
    const genre = 'pop'
    const sut = new MusicProviderAdapterMock()
    const playlist = await sut.load(genre)
    expect(playlist).toEqual(['pop_song1', 'pop_song2', 'pop_song3'])
  })

  test('should return a rock playlist, if playlistGenre is equal rock', async () => {
    const genre = 'rock'
    const sut = new MusicProviderAdapterMock()
    const playlist = await sut.load(genre)
    expect(playlist).toEqual(['rock_song1', 'rock_song2', 'rock_song3'])
  })

  test('should return a classical playlist, if playlistGenre is equal classical', async () => {
    const genre = 'classical'
    const sut = new MusicProviderAdapterMock()
    const playlist = await sut.load(genre)
    expect(playlist).toEqual(['classical_song1', 'classical_song2', 'classical_song3'])
  })
})
