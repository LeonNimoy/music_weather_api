
import { MusicProviderService } from './music-provider'
import { MusicProvider } from '../protocols/music-provider'

interface SutTypes {
  sut: MusicProviderService
  musicProviderAdapterStub: MusicProvider
}

const makeMusicProviderAdapter = (): MusicProvider => {
  class MusicProviderAdapterStub implements MusicProvider {
    async load (playlistGenre: string): Promise<string[]> {
      const playlist = ['any_music']

      return playlist
    }
  }
  return new MusicProviderAdapterStub()
}

const makeSut = (): SutTypes => {
  const musicProviderAdapterStub = makeMusicProviderAdapter()
  const sut = new MusicProviderService(musicProviderAdapterStub)
  return {
    sut,
    musicProviderAdapterStub
  }
}

describe('Music Provider Service', () => {
  test('should call Music Provider using Party genre, if the temperature is above 30° Celsius', async () => {
    const { musicProviderAdapterStub, sut } = makeSut()
    const temperature = 31

    const loadSpy = jest.spyOn(musicProviderAdapterStub, 'load')

    await sut.loadPlaylist(temperature)
    expect(loadSpy).toHaveBeenCalledWith('party')
  })
})
