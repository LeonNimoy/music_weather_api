
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
  test('should call Music Provider passing Party genre as param, if the temperature is above 30° Celsius', async () => {
    const { musicProviderAdapterStub, sut } = makeSut()
    const temperature = 31

    const loadSpy = jest.spyOn(musicProviderAdapterStub, 'load')

    await sut.loadPlaylist(temperature)
    expect(loadSpy).toHaveBeenCalledWith('party')
  })

  test('should call Music Provider passing Pop genre as param, if the temperature is between 15° and 30° Celsius', async () => {
    const { musicProviderAdapterStub, sut } = makeSut()
    const temperature = 16

    const loadSpy = jest.spyOn(musicProviderAdapterStub, 'load')

    await sut.loadPlaylist(temperature)
    expect(loadSpy).toHaveBeenCalledWith('pop')
  })

  test('should call Music Provider passing Rock genre as param, if the temperature is between 10° and 14° Celsius', async () => {
    const { musicProviderAdapterStub, sut } = makeSut()
    const temperature = 11

    const loadSpy = jest.spyOn(musicProviderAdapterStub, 'load')

    await sut.loadPlaylist(temperature)
    expect(loadSpy).toHaveBeenCalledWith('rock')
  })
})
